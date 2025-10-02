import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 북마크 삭제 API 경로를 생성하는 함수
 * @param courseId - 코스 ID
 * @returns API 경로 문자열
 */
export const DELETE_BOOKMARK_API_PATH = (courseId: string) =>
  `/api/v1/bookmarks/${courseId}`;

/**
 * @public
 * @category Bookmarks
 * @description 코스를 북마크에서 삭제합니다
 * @param instance - Axios 인스턴스
 * @param courseId - 삭제할 코스 ID
 * @returns 북마크 삭제 결과
 * @example
 * await deleteBookmarkApi(axiosInstance, "course123");
 */
export const deleteBookmarkApi = async (
  instance: AxiosInstance,
  courseId: string,
) => {
  const response = await instance({
    method: "delete",
    url: DELETE_BOOKMARK_API_PATH(courseId),
  });

  return response.data;
};
