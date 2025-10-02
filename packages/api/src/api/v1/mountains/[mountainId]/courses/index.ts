import { AxiosInstance } from "axios";
import { Course, CourseSortType } from "@model/course";

/**
 * @public
 * @category Constants
 * @description 특정 산의 코스 목록 API 경로를 생성하는 함수
 * @param mountainId - 산 ID
 * @param options - 검색 옵션
 * @param options.searchParams - 검색 파라미터
 * @param options.searchParams.sortBy - 정렬 기준 ("length" | "difficulty")
 * @returns API 경로 문자열
 */
export const COURSES_OF_MOUNTAIN_API_PATH = (
  mountainId: string,
  { searchParams }: { searchParams?: { sortBy?: CourseSortType } } = {},
) => {
  const params = new URLSearchParams();
  if (searchParams?.sortBy != null) params.set("sortBy", searchParams.sortBy);
  const query = params.toString();
  return `/api/v1/mountains/${encodeURIComponent(mountainId)}/courses${query ? `?${query}` : ""}`;
};

/**
 * @public
 * @category Types
 * @interface GetCoursesOfMountainResponse
 * @description 산의 코스 목록 조회 응답 타입
 * @property {Course[]} courses - 코스 목록
 */
export interface GetCoursesOfMountainResponse {
  courses: Course[];
}

/**
 * @public
 * @category Types
 * @interface GetCoursesOfMountainApiParams
 * @description 산의 코스 목록 조회 파라미터 타입
 * @property {string} mountainId - 산 ID
 * @property {CourseSortType} [sortBy] - 정렬 기준 (선택)
 */
interface GetCoursesOfMountainApiParams {
  mountainId: string;
  sortBy?: CourseSortType;
}

/**
 * @public
 * @category Mountains
 * @description 특정 산의 등산 코스 목록을 조회합니다
 * @param instance - Axios 인스턴스
 * @param params - 조회 파라미터
 * @param params.mountainId - 산 ID
 * @param params.sortBy - 정렬 기준 ("length": 거리순, "difficulty": 난이도순)
 * @returns 코스 목록
 * @example
 * const result = await getCoursesOfMountainApi(axiosInstance, {
 *   mountainId: "mountain123",
 *   sortBy: "difficulty"
 * });
 * console.log(result.courses);
 */
export const getCoursesOfMountainApi = async (
  instance: AxiosInstance,
  { mountainId, sortBy }: GetCoursesOfMountainApiParams,
) => {
  const response = await instance<GetCoursesOfMountainResponse>({
    method: "get",
    url: COURSES_OF_MOUNTAIN_API_PATH(mountainId, { searchParams: { sortBy } }),
  });

  return response.data;
};
