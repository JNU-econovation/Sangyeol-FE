import { AxiosInstance } from "axios";

export const USER_VERIFY_NUMBER_API_PATH = "/api/v1/users/verify-sms";

export interface PostVerifyPhoneNumberResponse {
  certificationCode: number;
}

export interface PostVerifyPhoneNumberRequest {
  certificationCode: string;
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
