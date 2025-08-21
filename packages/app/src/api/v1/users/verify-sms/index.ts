import authenticatedApi from "@api/_instances/authenticatedApi";

export const USER_VERIFY_NUMBER_API_PATH = "/api/v1/users/verify-sms";

interface PostVerifyPhoneNumberResponse {
  certificationCode: number;
}

interface PostVerifyPhoneNumberRequest {
  certificationCode: string;
}

export const postVerifyPhoneNumber = async ({
  certificationCode,
}: PostVerifyPhoneNumberRequest) => {
  const response = await authenticatedApi<PostVerifyPhoneNumberResponse>({
    method: "POST",
    url: USER_VERIFY_NUMBER_API_PATH,
    data: { certificationCode },
  });

  return response.data;
};
