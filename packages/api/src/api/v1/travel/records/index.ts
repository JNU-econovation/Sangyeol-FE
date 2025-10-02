import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 산행 기록 조회 API 경로를 생성하는 함수
 * @param params - 조회 파라미터
 * @param params.year - 년도
 * @param params.month - 월 (1-12)
 * @returns API 경로 문자열
 */
export const TRAVEL_RECORDS_API_PATH = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => `/api/v1/travel/records?year=${year}&month=${month}`;

/**
 * @public
 * @category Types
 * @interface Record
 * @description 산행 기록 타입
 * @property {string} id - 기록 ID
 * @property {number} date - 등산 날짜 (timestamp)
 * @property {string} displayName - 코스 표시 이름
 * @property {number} length - 거리 (m)
 * @property {number} duration - 소요 시간 (초)
 * @property {"EASY" | "NORMAL" | "HARD"} difficulty - 난이도
 * @property {string} image - 코스 이미지 URL
 */
interface Record {
  id: string;
  date: number;
  displayName: string;
  length: number;
  duration: number;
  difficulty: "EASY" | "NORMAL" | "HARD";
  image: string;
}

/**
 * @public
 * @category Types
 * @interface GetTravelRecordsResponse
 * @description 산행 기록 조회 응답 타입
 * @property {Record[]} records - 산행 기록 목록
 */
export interface GetTravelRecordsResponse {
  records: Record[];
}

// TODO: api 변경 반영 필요

/**
 * @public
 * @category Travel
 * @description 특정 년월의 산행 기록을 조회합니다
 * @param instance - Axios 인스턴스
 * @param params - 조회 파라미터
 * @param params.year - 년도
 * @param params.month - 월 (1-12)
 * @returns 산행 기록 목록
 * @example
 * const result = await getTravelRecord(axiosInstance, { year: 2024, month: 10 });
 * console.log(result.records);
 */
export const getTravelRecord = async (
  instance: AxiosInstance,
  { year, month }: { year: number; month: number },
) => {
  const response = await instance<GetTravelRecordsResponse>({
    method: "GET",
    url: TRAVEL_RECORDS_API_PATH({ year, month }),
  });

  return response.data;
};
