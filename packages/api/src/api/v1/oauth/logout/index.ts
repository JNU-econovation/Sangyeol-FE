import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 로그아웃 API 경로
 */
export const LOGOUT_API_PATH = "/api/v1/oauth/logout";

/**
 * @public
 * @category OAuth
 * @description 로그아웃을 처리합니다
 * @param {AxiosInstance} instance - Axios 인스턴스
 * @returns {Promise<null>} 로그아웃 응답 데이터 (null)
 * @example
 * await postLogoutApi(axiosInstance);
 */
export const postLogoutApi = async (
  instance: AxiosInstance,
): Promise<null> => {
  const response = await instance<null>({
    method: "POST",
    url: LOGOUT_API_PATH,
  });

  return response.data;
};
