import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 베이스 상세 정보 조회 API 경로를 생성하는 함수
 * @param mountainId - 산 ID
 * @returns API 경로 문자열
 */
export const BASES_DETAIL_API_PATH = (mountainId: string) =>
  `/api/v1/bases/${mountainId}/details`;

/**
 * @public
 * @category Types
 * @description 날씨 타입 (OpenWeather API 기반)
 */
export type Weather =
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Mist"
  | "Clear"
  | "Clouds";

/**
 * @public
 * @category Types
 * @interface BaseInfo
 * @description 베이스 상세 정보
 * @property {string} baseId - 베이스 ID
 * @property {string} name - 베이스 이름
 * @property {Weather} weather - 현재 날씨
 * @property {string} temperature - 현재 온도
 * @property {null} recommendedOutfit - 추천 복장 (미구현)
 * @property {[string, string]} images - 베이스 이미지 2개
 */
export interface BaseInfo {
  baseId: string;
  name: string;
  weather: Weather;
  temperature: string;
  recommendedOutfit: null;
  images: [string, string];
}

/**
 * @public
 * @category Types
 * @interface GetBasesDetailApiResponse
 * @description 베이스 상세 정보 조회 응답 타입
 * @property {string} mountainId - 산 ID
 * @property {BaseInfo[]} baseDetails - 베이스 상세 정보 목록
 */
export interface GetBasesDetailApiResponse {
  mountainId: string;
  baseDetails: BaseInfo[];
}

/**
 * @public
 * @category Bases
 * @description 특정 산의 베이스 상세 정보를 조회합니다 (날씨, 온도, 이미지 포함)
 * @param instance - Axios 인스턴스
 * @param mountainId - 산 ID
 * @returns 베이스 상세 정보
 * @example
 * const result = await getBasesDetailApi(axiosInstance, "mountain123");
 * console.log(result.baseDetails[0].weather); // "Clear"
 */
export const getBasesDetailApi = async (
  instance: AxiosInstance,
  mountainId: string,
) => {
  const response = await instance<GetBasesDetailApiResponse>({
    method: "get",
    url: BASES_DETAIL_API_PATH(mountainId),
  });

  return response.data;
};
