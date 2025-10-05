import { CourseDifficulty } from "@model/course";
import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 북마크 API 경로
 */
export const BOOKMARK_API_PATH = "/api/v1/bookmarks";

/**
 * @public
 * @category Types
 * @description 북마크 정보 타입
 * @property {string} id - 코스 ID
 * @property {string} name - 코스 이름
 * @property {number} length - 코스 길이 (km)
 * @property {number} duration - 소요 시간 (분)
 * @property {CourseDifficulty} difficulty - 코스 난이도
 * @property {true} bookmark - 북마크 상태 (항상 true)
 * @property {string} image - 코스 이미지 URL
 * @property {string} mountainId - 산 ID
 */
export type Bookmark = {
  id: string;
  name: string;
  length: 10.4;
  duration: 350;
  difficulty: CourseDifficulty;
  bookmark: true;
  image: string;
  mountainId: string;
};

/**
 * @public
 * @category Types
 * @interface GetBookmarksResponse
 * @description 북마크 목록 조회 응답 타입
 * @property {Course[]} bookmarkList - 북마크된 코스 목록
 */
export interface GetBookmarksResponse {
  bookmarkList: Bookmark[];
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
