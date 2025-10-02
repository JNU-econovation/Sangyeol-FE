import { AxiosInstance } from "axios";
import type { BaseMarker } from "@model/map";

/**
 * @public
 * @category Constants
 * @description 베이스 목록 조회 API 경로를 생성하는 함수
 * @param mountainId - 산 ID
 * @returns API 경로 문자열
 */
export const BASES_API_PATH = (mountainId: string) =>
  `/api/v1/bases?mountainId=${encodeURIComponent(mountainId)}`;

/**
 * @public
 * @category Types
 * @interface GetBasesApiResponse
 * @description 베이스 목록 조회 응답 타입
 * @property {string} mountainId - 산 ID
 * @property {BaseMarker[]} bases - 베이스 마커 목록
 */
export interface GetBasesApiResponse {
  mountainId: string;
  bases: BaseMarker[];
}

/**
 * @public
 * @category Bases
 * @description 특정 산의 베이스 목록을 조회합니다
 * @param Instance - Axios 인스턴스
 * @param mountainId - 산 ID
 * @returns 베이스 목록 정보
 * @example
 * const result = await getBasesApi(axiosInstance, "mountain123");
 * console.log(result.bases); // BaseMarker[]
 */
export const getBasesApi = async (
  Instance: AxiosInstance,
  mountainId: string,
) => {
  const response = await Instance<GetBasesApiResponse>({
    method: "get",
    url: BASES_API_PATH(mountainId),
  });

  return response.data;
};
