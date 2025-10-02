import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description Apple 로그인 API 경로
 */
export const LOGIN_API_PATH = "/api/v1/oauth/apple/login";

/**
 * @public
 * @category Types
 * @interface PostLoginRequest
 * @description Apple 로그인 요청 타입
 * @property {string} identityToken - Apple Identity Token
 * @property {string} email - 사용자 이메일
 * @property {object} fullName - 사용자 이름 정보
 * @property {string} fullName.familyName - 성
 * @property {string} fullName.givenName - 이름
 */
export interface PostLoginRequest {
  identityToken: string;
  email: string;
  fullName: {
    familyName: string;
    givenName: string;
  };
}

/**
 * @public
 * @category OAuth
 * @description Apple 소셜 로그인을 수행합니다
 * @param instance - Axios 인스턴스
 * @param body - Apple 로그인 요청 데이터
 * @returns 로그인 응답 데이터
 * @example
 * const result = await postLogin(axiosInstance, {
 *   identityToken: "abc123...",
 *   email: "user@example.com",
 *   fullName: { familyName: "김", givenName: "철수" }
 * });
 */
export const postLogin = async (
  instance: AxiosInstance,
  body: PostLoginRequest,
) => {
  const response = await instance.post(LOGIN_API_PATH, body);
  return response.data;
};
