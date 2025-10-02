import { AxiosInstance } from "axios";
import { Course } from "@model/course";

/**
 * @public
 * @category Constants
 * @description 북마크 API 경로
 */
export const BOOKMARK_API_PATH = "/api/v1/bookmarks";

/**
 * @public
 * @category Types
 * @interface GetBookmarksResponse
 * @description 북마크 목록 조회 응답 타입
 * @property {Course[]} bookmarkList - 북마크된 코스 목록
 */
export interface GetBookmarksResponse {
  bookmarkList: Course[];
}

/**
 * @public
 * @category Bookmarks
 * @description 사용자의 북마크 목록을 조회합니다
 * @param instance - Axios 인스턴스
 * @returns 북마크된 코스 목록
 * @example
 * const result = await getBookmarksApi(axiosInstance);
 * console.log(result.bookmarkList); // Course[]
 */
export const getBookmarksApi = async (instance: AxiosInstance) => {
  const response = await instance<GetBookmarksResponse>({
    method: "get",
    url: BOOKMARK_API_PATH,
  });
  return response.data;
};

/**
 * @public
 * @category Bookmarks
 * @description 코스를 북마크에 추가합니다
 * @param instance - Axios 인스턴스
 * @param courseId - 북마크할 코스 ID
 * @returns 북마크 추가 결과
 * @example
 * await postBookmarkApi(axiosInstance, "course123");
 */
export const postBookmarkApi = async (
  instance: AxiosInstance,
  courseId: string,
) => {
  const response = await instance<null>({
    method: "post",
    url: BOOKMARK_API_PATH,
    data: {
      courseId,
    },
  });

  return response.data;
};
