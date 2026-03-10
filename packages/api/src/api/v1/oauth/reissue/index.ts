import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 토큰 재발급 API 경로
 */
export const REISSUE_API_PATH = "/api/v1/auth/reissue";

/**
 * @public
 * @category Types
 * @interface PostReissueRequest
 * @description 토큰 재발급 요청 타입
 * @property {string} refreshToken - 리프레시 토큰
 */
export interface PostReissueRequest {
  refreshToken: string;
}

/**
 * @public
 * @category Types
 * @interface PostReissueResponse
 * @description 토큰 재발급 응답 타입
 * @property {string} accessToken - 새로운 액세스 토큰
 * @property {string} refreshToken - 새로운 리프레시 토큰
 * @property {number} accessTokenExpiredTime - 액세스 토큰 만료 시간 (Unix timestamp)
 */
export interface PostReissueResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredTime: number;
}

/**
 * @public
 * @category OAuth
 * @description 만료된 accessToken을 refreshToken을 사용하여 재발급합니다
 * @param {AxiosInstance} instance - Axios 인스턴스
 * @param {PostReissueRequest} body - 토큰 재발급 요청 데이터
 * @returns {Promise<PostReissueResponse>} 재발급된 토큰 정보
 * @example
 * const result = await postReissueApi(axiosInstance, { refreshToken: "abc123..." });
 * console.log(result.accessToken); // "new_access_token"
 */
export const postReissueApi = async (
  instance: AxiosInstance,
  body: PostReissueRequest,
) => {
  const response = await instance<PostReissueResponse>({
    method: "POST",
    url: REISSUE_API_PATH,
    data: body,
  });

  return response.data;
};
