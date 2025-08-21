import authenticatedApi from "@api/_instances/authenticatedApi";
import { isValidPhoneNumber } from "@utils/phoneNumber";

export const USER_VERIFY_SMS_API_PATH = "/api/v1/users/sms";

interface PostSMSForVerificationResponse {
  phoneNumber: string;
}

export const postSMSForVerification = async (phoneNumber: string) => {
  if (!isValidPhoneNumber(phoneNumber))
    throw new Error("[postSMSForVerification] 올바른 휴대폰 번호가 아닙니다.");
  const response = await authenticatedApi<PostSMSForVerificationResponse>({
    method: "POST",
    url: USER_VERIFY_SMS_API_PATH,
    data: { phoneNumber },
  });

  return response.data;
};
