import { AxiosInstance } from "axios";

export const USER_PROFILE_API_PATH = "/api/v1/users/profile";

export interface PostProfileResponse {
  nickname: string;
  phoneNumber: string;
  email: string;
}

export interface PostProfileRequest {
  nickname: string;
  phoneNumber: string;
  email: string;
}

export const postProfile = async (
  instance: AxiosInstance,
  profileData: PostProfileRequest,
) => {
  const response = await instance<PostProfileResponse>({
    method: "POST",
    url: USER_PROFILE_API_PATH,
    data: profileData,
  });

  return response.data;
};
