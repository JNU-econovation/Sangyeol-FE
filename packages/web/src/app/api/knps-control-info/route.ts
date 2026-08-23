import { NextRequest, NextResponse } from "next/server";

import type { GetKnpsControlInfoApiResponse } from "@shared/api/queries/useKnpsControlInfoQuery";

const KNPS_CONTROL_DETAIL_URL =
  "https://www.knps.or.kr/front/portal/safe/acsCtrDtl.do";
const KNPS_MENU_NO = "8000340";

// KNPS 웹방화벽(WAF)이 브라우저가 아닌 User-Agent 요청을 차단하므로 브라우저 UA를 명시한다
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const REVALIDATE_SECONDS = 60 * 60 * 24; // KNPS 페이지는 하루 단위로만 다시 가져온다

const decodeHtmlEntities = (text: string) =>
  text
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

const stripTags = (html: string) =>
  decodeHtmlEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const parseControlInfo = (
  html: string,
): GetKnpsControlInfoApiResponse | null => {
  const tableMatch = html.match(
    /class="control_info_viwe"[\s\S]*?<table>([\s\S]*?)<\/table>/,
  );
  if (!tableMatch) return null;

  const tableHtml = tableMatch[1];

  const cells = new Map<string, string>();
  const cellPairRegex = /<th[^>]*>([\s\S]*?)<\/th>\s*<td[^>]*>([\s\S]*?)<\/td>/g;
  for (const match of tableHtml.matchAll(cellPairRegex)) {
    cells.set(stripTags(match[1]), match[2]);
  }

  const park = stripTags(cells.get("공원(사무소)") ?? "");
  const status = stripTags(cells.get("상황") ?? "");
  const reason = stripTags(cells.get("통제사유") ?? "");
  const baseTime = stripTags(cells.get("기준시간") ?? "");

  // '내용' 행은 th 없이 class="cont"인 td 하나로만 구성된다
  const contentMatch = tableHtml.match(
    /<td[^>]*class="[^"]*\bcont\b[^"]*"[^>]*>([\s\S]*?)<\/td>/,
  );
  const contentHtml = contentMatch ? contentMatch[1].trim() : "";

  if (!park || !status) return null;

  return { park, status, reason, baseTime, contentHtml };
};

export async function GET(request: NextRequest) {
  const rstId = request.nextUrl.searchParams.get("rstId");
  if (!rstId || !/^\d{4}$/.test(rstId)) {
    return NextResponse.json(
      { error: "rstId는 4자리 숫자여야 합니다." },
      { status: 400 },
    );
  }

  let html: string;
  try {
    const response = await fetch(
      `${KNPS_CONTROL_DETAIL_URL}?menuNo=${KNPS_MENU_NO}&rstId=${rstId}`,
      {
        headers: {
          "User-Agent": BROWSER_USER_AGENT,
          Accept: "text/html",
          "Accept-Language": "ko-KR,ko;q=0.9",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `KNPS 응답 오류 (HTTP ${response.status})` },
        { status: 502 },
      );
    }

    html = await response.text();
  } catch {
    return NextResponse.json(
      { error: "KNPS 페이지 요청에 실패했습니다." },
      { status: 502 },
    );
  }

  const controlInfo = parseControlInfo(html);
  if (!controlInfo) {
    return NextResponse.json(
      { error: "KNPS 페이지에서 통제정보를 찾지 못했습니다." },
      { status: 502 },
    );
  }

  return NextResponse.json(controlInfo);
}
