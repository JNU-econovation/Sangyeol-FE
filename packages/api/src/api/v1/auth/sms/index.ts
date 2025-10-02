import { AxiosInstance } from "axios";
import { isValidPhoneNumber } from "@utils/phoneNumber";

/**
 * @public
 * @category Constants
 * @description SMS 인증 요청 API 경로
 */
export const USER_VERIFY_SMS_API_PATH = "/api/v1/auth/sms";

/**
 * @public
 * @category Types
 * @interface PostSMSForVerificationResponse
 * @description SMS 인증 요청 응답 타입
 * @property {string} phoneNumber - 인증 요청된 휴대폰 번호
 */
export interface PostSMSForVerificationResponse {
  phoneNumber: string;
}

/**
 * @public
 * @category Auth
 * @description 휴대폰 번호로 SMS 인증 코드를 요청합니다
 * @param {AxiosInstance} instance - Axios 인스턴스
 * @param {string} phoneNumber - 인증받을 휴대폰 번호
 * @returns {Promise<PostSMSForVerificationResponse>} 인증 요청 결과
 * @throws {Error} 올바르지 않은 휴대폰 번호 형식인 경우
 * @example
 * const result = await postSMSForVerification(axiosInstance, "01012345678");
 * console.log(result.phoneNumber); // "01012345678"
 */
export const postSMSForVerification = async (
  instance: AxiosInstance,
  phoneNumber: string,
) => {
  if (!isValidPhoneNumber(phoneNumber))
    throw new Error("[postSMSForVerification] 올바른 휴대폰 번호가 아닙니다.");
  const response = await instance<PostSMSForVerificationResponse>({
    method: "POST",
    url: USER_VERIFY_SMS_API_PATH,
    data: { phoneNumber },
  });

  return response.data;
};
