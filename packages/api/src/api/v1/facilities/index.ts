import { AxiosInstance } from "axios";
import type { FacilityMarker } from "@model/map";

/**
 * @public
 * @category Constants
 * @description 편의시설 목록 조회 API 경로를 생성하는 함수
 * @param mountainId - 산 ID
 * @returns API 경로 문자열
 */
export const FACILITY_API_PATH = (mountainId: string) =>
  `/api/v1/facilities?mountainId=${mountainId}`;

/**
 * @public
 * @category Types
 * @interface GetFacilitiesApiResponse
 * @description 편의시설 목록 조회 응답 타입
 * @property {string} mountainId - 산 ID
 * @property {FacilityMarker[]} facilities - 편의시설 마커 목록
 */
export interface GetFacilitiesApiResponse {
  mountainId: string;
  facilities: FacilityMarker[];
}

/**
 * @public
 * @category Facilities
 * @description 특정 산의 편의시설 목록을 조회합니다 (화장실, 주차장 등)
 * @param instance - Axios 인스턴스
 * @param mountainId - 산 ID
 * @returns 편의시설 목록
 * @example
 * const result = await getFacilitiesApi(axiosInstance, "mountain123");
 * console.log(result.facilities); // FacilityMarker[]
 */
export const getFacilitiesApi = async (
  instance: AxiosInstance,
  mountainId: string,
) => {
  const response = await instance<GetFacilitiesApiResponse>({
    method: "get",
    url: FACILITY_API_PATH(mountainId),
  });

  return response.data;
};
