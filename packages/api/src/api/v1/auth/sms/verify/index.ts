import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 휴대폰 번호 인증 확인 API 경로
 */
export const USER_VERIFY_NUMBER_API_PATH = "/api/v1/auth/sms/verify";

/**
 * @public
 * @category Types
 * @interface PostVerifyPhoneNumberResponse
 * @description 휴대폰 번호 인증 확인 응답 타입
 * @property {number} verificationCode - 인증 코드
 */
export interface PostVerifyPhoneNumberResponse {
  verificationCode: string;
}

/**
 * @public
 * @category Types
 * @interface PostVerifyPhoneNumberRequest
 * @description 휴대폰 번호 인증 확인 요청 타입
 * @property {number} verificationCode - 사용자가 입력한 인증 코드
 */
export interface PostVerifyPhoneNumberRequest {
  phoneNumber: string;
  verificationCode: string;
}

/**
 * @public
 * @category Auth
 * @description SMS로 받은 인증 코드를 검증합니다
 * @param {AxiosInstance} instance - Axios 인스턴스
 * @param {PostVerifyPhoneNumberRequest} request - 인증 코드가 포함된 요청 객체
 * @returns {Promise<PostVerifyPhoneNumberResponse>} 인증 확인 결과
 * @example
 * const result = await postVerifyPhoneNumber(axiosInstance, { verificationCode: 123456 });
 * console.log(result.verificationCode);
 */
export const postVerifyPhoneNumber = async (
  instance: AxiosInstance,
  { verificationCode, phoneNumber }: PostVerifyPhoneNumberRequest,
) => {
  const response = await instance<PostVerifyPhoneNumberResponse>({
    method: "POST",
    url: USER_VERIFY_NUMBER_API_PATH,
    data: { verificationCode, phoneNumber },
  });

  return response.data;
};
