import { AxiosInstance } from "axios";

export const USER_VERIFY_NUMBER_API_PATH = "/api/v1/auth/sms/verify";

export interface PostVerifyPhoneNumberResponse {
  certificationCode: number;
}

export interface PostVerifyPhoneNumberRequest {
  certificationCode: number;
}

export const postVerifyPhoneNumber = async (
  instance: AxiosInstance,
  { certificationCode }: PostVerifyPhoneNumberRequest,
) => {
  const response = await instance<PostVerifyPhoneNumberResponse>({
    method: "POST",
    url: USER_VERIFY_NUMBER_API_PATH,
    data: { certificationCode },
  });

  return response.data;
};
