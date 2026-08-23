import { useQuery } from "@tanstack/react-query";

export interface KmaWeather {
  temperature: number | null;
  feelsLike: number | null;
  humidity: number | null;
  precipitationAmount: number | null;
  precipitationProbability: number | null;
  sunrise: string | null;
  sunset: string | null;
  baseTime: string | null;
}

export const KMA_WEATHER_API_PATH = (code: string) =>
  `/api/kma-weather?code=${code}`;

interface KmaWeatherQueryProps {
  code: string;
}

const getKmaWeather = async (code: string) => {
  const response = await fetch(KMA_WEATHER_API_PATH(code));

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? "날씨 정보 조회에 실패했습니다.");
  }

  return (await response.json()) as KmaWeather;
};

const useKmaWeatherQuery = ({ code }: KmaWeatherQueryProps) => {
  return useQuery({
    queryKey: [KMA_WEATHER_API_PATH(code)],
    queryFn: () => getKmaWeather(code),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export default useKmaWeatherQuery;
