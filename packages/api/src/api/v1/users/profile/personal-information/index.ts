import { AxiosInstance } from "axios";

export const USER_PERSONAL_INFORMATION_API_PATH =
  "/api/v1/users/profile/personal-information";

export interface PostUserPersonalInformationRequest {
  name: string;
  weight: number;
  height: number;
  bloodType: "A" | "B" | "AB" | "O";
}

export interface PostUserPersonalInformationResponse {
  name: string;
  weight: number;
  height: number;
  bloodType: "A" | "B" | "AB" | "O";
}

//TODO: api 변경 반영 필요

/**
 *
 * 프로필
 */
export const postUserPersonalInformation = async (
  instance: AxiosInstance,
  body: PostUserPersonalInformationRequest,
) => {
  const response = await instance<PostUserPersonalInformationResponse>({
    method: "POST",
    url: USER_PERSONAL_INFORMATION_API_PATH,
    data: body,
  });

  return response.data;
};
