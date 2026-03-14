import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 로그아웃 API 경로
 */
export const LOGOUT_API_PATH = "/api/v1/oauth/logout";

/**
 * @public
 * @category Types
 * @interface PostLogoutResponse
 * @description 로그아웃 응답 타입
 * @property {null} data - 응답 데이터 (없음)
 * @property {string} status - 응답 상태
 */
export interface PostLogoutResponse {
  data: null;
  status: string;
}

/**
 * @public
 * @category OAuth
 * @description 로그아웃을 처리합니다
 * @param {AxiosInstance} instance - Axios 인스턴스
 * @returns {Promise<PostLogoutResponse>} 로그아웃 응답
 * @example
 * const result = await postLogoutApi(axiosInstance);
 * console.log(result.status); // "success"
 */
export const postLogoutApi = async (
  instance: AxiosInstance,
): Promise<PostLogoutResponse> => {
  const response = await instance<PostLogoutResponse>({
    method: "POST",
    url: LOGOUT_API_PATH,
  });

  return response.data;
};
