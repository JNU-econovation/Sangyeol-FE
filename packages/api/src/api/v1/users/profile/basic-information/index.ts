import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 프로필 기본 정보 API 경로
 */
export const USER_BASIC_INFORMATION_API_PATH =
  "/api/v1/users/profile/basic-information";

/**
 * @public
 * @category Types
 * @interface PostUserBasicInformationRequest
 * @description 프로필 기본 정보 작성 요청 타입
 * @property {string} nickname - 닉네임
 * @property {string} phoneNumber - 휴대폰 번호
 * @property {string} email - 이메일
 */
export interface PostUserBasicInformationRequest {
  nickname: string;
  phoneNumber: string;
  email: string;
}

/**
 * @public
 * @category Types
 * @interface PostUserBasicInformationResponse
 * @description 프로필 기본 정보 작성 응답 타입
 * @property {string} nickname - 닉네임
 * @property {string} phoneNumber - 휴대폰 번호
 * @property {string} email - 이메일
 */
export interface PostUserBasicInformationResponse {
  nickname: string;
  phoneNumber: string;
  email: string;
}

//TODO: api 변경 반영 필요

/**
 * @public
 * @category Users
 * @description 프로필 기본 정보를 작성합니다 (회원가입 시)
 * @param instance - Axios 인스턴스
 * @param body - 기본 정보 데이터
 * @returns 작성된 기본 정보
 * @example
 * const result = await postUserBasicInformation(axiosInstance, {
 *   nickname: "산악인",
 *   phoneNumber: "01012345678",
 *   email: "user@example.com"
 * });
 */
export const postUserBasicInformation = async (
  instance: AxiosInstance,
  body: PostUserBasicInformationRequest,
) => {
  const response = await instance<PostUserBasicInformationResponse>({
    method: "POST",
    url: USER_BASIC_INFORMATION_API_PATH,
    data: body,
  });

  return response.data;
};
