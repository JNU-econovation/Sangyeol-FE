import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 산행 기록 상세 조회 API 경로를 생성하는 함수
 * @param params - 조회 파라미터
 * @param params.recordId - 기록 ID
 * @returns API 경로 문자열
 */
export const TRAVEL_RECORD_DETAILS_API_PATH = ({
  recordId,
}: {
  recordId: string;
}) => `/api/v1/travel/records/${recordId}/details`;

/**
 * @public
 * @category Types
 * @interface GetTravelRecordDetailsResponse
 * @description 산행 기록 상세 조회 응답 타입
 * @property {string} recordId - 기록 ID
 * @property {string} displayName - 코스 표시 이름
 * @property {number} startedAt - 시작 시간 (timestamp)
 * @property {number} endAt - 종료 시간 (timestamp)
 * @property {number} duration - 소요 시간 (초)
 * @property {number} length - 거리 (m)
 * @property {[number, number][]} coordinates - GPS 좌표 배열 ([위도, 경도])
 * @property {string} courseId - 코스 ID
 * @property {string} mountainId - 산 ID
 */
export interface GetTravelRecordDetailsResponse {
  recordId: string;
  displayName: string;
  startedAt: number;
  endAt: number;
  duration: number;
  length: number;
  coordinates: [number, number][];
  courseId: string;
  mountainId: string;
}

/**
 * @public
 * @category Travel
 * @description 산행 기록의 상세 정보를 조회합니다 (GPS 좌표 포함)
 * @param instance - Axios 인스턴스
 * @param params - 조회 파라미터
 * @param params.recordId - 기록 ID
 * @returns 산행 기록 상세 정보
 * @example
 * const result = await getTravelRecordDetails(axiosInstance, { recordId: "record123" });
 * console.log(result.records[0].coordinates); // GPS 경로
 */
export const getTravelRecordDetails = async (
  instance: AxiosInstance,
  { recordId }: { recordId: string },
) => {
  const response = await instance<GetTravelRecordDetailsResponse>({
    method: "GET",
    url: TRAVEL_RECORD_DETAILS_API_PATH({ recordId }),
  });

  return response.data;
};
