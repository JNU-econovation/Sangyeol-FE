import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 카카오 로그인 API 경로
 */
export const KAKAO_LOGIN_URI = `/api/v1/oauth/kakao/login`;

/**
 * @public
 * @category Types
 * @interface KakaoLoginResponse
 * @description 카카오 로그인 응답 타입
 * @property {string} uri - 카카오 OAuth 인증 URI
 */
export interface KakaoLoginResponse {
  uri: string;
}

/**
 * @public
 * @category OAuth
 * @description 카카오 로그인 URI를 가져옵니다
 * @param instance - Axios 인스턴스
 * @returns 카카오 OAuth 인증 URI가 포함된 응답
 * @example
 * const result = await getKakaoLoginApi(axiosInstance);
 * window.location.href = result.uri;
 */
export const getKakaoLoginApi = async (instance: AxiosInstance) => {
  const response = await instance<KakaoLoginResponse>({
    method: "get",
    url: KAKAO_LOGIN_URI,
  });

  return response.data;
};
