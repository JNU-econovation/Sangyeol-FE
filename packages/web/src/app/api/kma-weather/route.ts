import { NextRequest, NextResponse } from "next/server";

import type { KmaWeather } from "@shared/api/queries/useKmaWeatherQuery";
import { MUDEUNGSAN_KMA_DONG_CODE } from "@shared/constants/mountain/index";

const KMA_CURRENT_WEATHER_URL =
  "https://www.weather.go.kr/w/wnuri-fct2021/main/current-weather.do";
const KMA_DIGITAL_FORECAST_URL =
  "https://www.weather.go.kr/w/wnuri-fct2021/main/digital-forecast.do";

// 기상청이 브라우저가 아닌 User-Agent 요청을 차단할 수 있으므로 브라우저 UA를 명시한다
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const REVALIDATE_SECONDS = 300;

const fetchKmaHtml = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "User-Agent": BROWSER_USER_AGENT,
      Accept: "text/html",
      "Accept-Language": "ko-KR,ko;q=0.9",
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`기상청 응답 오류 (HTTP ${response.status})`);
  }

  return response.text();
};

const matchNumber = (html: string, regex: RegExp) => {
  const match = html.match(regex);
  if (!match) return null;

  const value = Number(match[1]);
  return Number.isNaN(value) ? null : value;
};

const matchText = (html: string, regex: RegExp) => {
  const match = html.match(regex);
  return match ? match[1].trim() : null;
};

const parseCurrentWeather = (
  html: string,
): Omit<KmaWeather, "precipitationProbability"> => ({
  temperature: matchNumber(html, /class="tmp">\s*(-?[\d.]+)\s*<small>℃/),
  feelsLike: matchNumber(html, /class="chill">체감\((-?[\d.]+)℃\)/),
  humidity: matchNumber(html, /ic-hm">습도[\s\S]*?class="val">\s*([\d.]+)/),
  precipitationAmount: matchNumber(
    html,
    /1시간강수량<\/span><span class="val">\s*([\d.]+)/,
  ),
  sunrise: matchText(
    html,
    /sunrise with-txt">일출<\/span>\s*<span>([\d:]+)<\/span>/,
  ),
  sunset: matchText(
    html,
    /sunset with-txt">일몰<\/span>\s*<span>([\d:]+)<\/span>/,
  ),
  baseTime: matchText(html, /"updated-at"[^>]*><span>([^<]+)<\/span>\s*현재/),
});

// 시각별 예보 섹션(dfs-tab-body) 내부만 탐색 — 문서 앞쪽 일별 예보의 강수확률 오매칭 방지
const parseNearestPrecipitationProbability = (html: string) => {
  const hourlySectionStart = html.indexOf('class="dfs-tab-body"');
  if (hourlySectionStart === -1) return null;

  return matchNumber(
    html.slice(hourlySectionStart),
    /강수확률: <\/span><span>(\d+)%/,
  );
};

// 임의 지역 코드로의 요청 릴레이(오픈 프록시)와 캐시 증식을 막기 위해 서비스 지역만 허용한다
const ALLOWED_CODES = new Set([MUDEUNGSAN_KMA_DONG_CODE]);

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code || !ALLOWED_CODES.has(code)) {
    return NextResponse.json(
      { error: "지원하지 않는 지역 코드입니다." },
      { status: 400 },
    );
  }

  const [currentResult, forecastResult] = await Promise.allSettled([
    fetchKmaHtml(`${KMA_CURRENT_WEATHER_URL}?code=${code}&aws=N&unit=m%2Fs`),
    fetchKmaHtml(`${KMA_DIGITAL_FORECAST_URL}?code=${code}&unit=m%2Fs&hr1=Y`),
  ]);

  if (currentResult.status === "rejected") {
    return NextResponse.json(
      { error: "기상청 현재날씨 요청에 실패했습니다." },
      { status: 502 },
    );
  }

  const currentWeather = parseCurrentWeather(currentResult.value);
  if (currentWeather.temperature === null) {
    return NextResponse.json(
      { error: "기상청 응답에서 날씨 정보를 찾지 못했습니다." },
      { status: 502 },
    );
  }

  // 기상청 마크업 변경으로 일부 필드만 조용히 깨지는 상황을 감지하기 위한 로그
  const missingFields = Object.entries(currentWeather)
    .filter(([, value]) => value === null)
    .map(([key]) => key);
  if (missingFields.length > 0) {
    console.warn(
      `[kma-weather] 파싱 실패 필드: ${missingFields.join(", ")} (code=${code})`,
    );
  }

  // 강수확률은 보조 정보이므로 예보 요청이 실패해도 나머지 정보는 그대로 응답한다
  if (forecastResult.status === "rejected") {
    console.warn("[kma-weather] 예보 요청 실패", forecastResult.reason);
  }
  const precipitationProbability =
    forecastResult.status === "fulfilled"
      ? parseNearestPrecipitationProbability(forecastResult.value)
      : null;
  if (forecastResult.status === "fulfilled" && precipitationProbability === null) {
    console.warn(`[kma-weather] 강수확률 파싱 실패 (code=${code})`);
  }

  const weather: KmaWeather = { ...currentWeather, precipitationProbability };

  return NextResponse.json(weather);
}
