import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 산행 기록 삭제 API 경로를 생성하는 함수
 * @param recordId - 기록 ID
 * @returns API 경로 문자열
 */
export const TRAVEL_RECORD_API_PATH = (recordId: string) =>
  `/api/v1/travel/records/${recordId}`;

// TODO: api 변경 반영 필요

/**
 * @public
 * @category Travel
 * @description 산행 기록을 삭제합니다
 * @param instance - Axios 인스턴스
 * @param recordId - 삭제할 기록 ID
 * @returns 삭제 결과
 * @example
 * await deleteTravelRecord(axiosInstance, "record123");
 */
export const deleteTravelRecord = async (
  instance: AxiosInstance,
  recordId: string,
) => {
  const response = await instance({
    method: "DELETE",
    url: TRAVEL_RECORD_API_PATH(recordId),
  });

  return response.data;
};
