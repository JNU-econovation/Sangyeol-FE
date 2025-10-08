import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 연관 산 검색 API 경로를 생성하는 함수
 * @param keyword - 검색 키워드
 * @returns API 경로 문자열
 */
export const RELATED_MOUNTAINS_API_PATH = (keyword: string) =>
  `api/v1/mountains/searches/suggestions?keyword=${encodeURIComponent(keyword)}`;

/**
 * @public
 * @category Types
 * @interface GetRelatedMountainsParams
 * @description 연관 산 검색 파라미터 타입
 * @property {string} keyword - 검색 키워드
 */
interface GetRelatedMountainsParams {
  keyword: string;
}

/**
 * @public
 * @category Types
 * @interface Mountain
 * @description 산 정보 타입
 * @property {string} mountainId - 산 ID
 * @property {string} name - 산 이름
 */
export interface Mountain {
  id: string;
  name: string;
  coordinate: [number, number];
}

/**
 * @public
 * @category Types
 * @interface GetRelatedMountainsResponse
 * @description 연관 산 검색 응답 타입
 * @property {Mountain[]} relatedMountainList - 연관 산 목록
 */
export interface GetRelatedMountainsResponse {
  suggestedMountainDTOs: Mountain[];
}

/**
 * @public
 * @category Mountains
 * @description 키워드로 연관된 산 목록을 검색합니다
 * @param instance - Axios 인스턴스
 * @param params - 검색 파라미터
 * @param params.keyword - 검색 키워드 (산 이름)
 * @returns 연관 산 목록
 * @example
 * const result = await getRelatedMountains(axiosInstance, { keyword: "북한산" });
 * console.log(result.relatedMountainList);
 */
export const getRelatedMountains = async (
  instance: AxiosInstance,
  { keyword }: GetRelatedMountainsParams,
) => {
  const response = await instance<GetRelatedMountainsResponse>({
    method: "get",
    url: RELATED_MOUNTAINS_API_PATH(keyword),
  });

  return response.data;
};
