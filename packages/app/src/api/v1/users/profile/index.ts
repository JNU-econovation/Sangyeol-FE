import authenticatedApi from "@api/_instances/authenticatedApi";

export const USER_PROFILE_API_PATH = "/api/v1/users/profile";

interface PostProfileResponse {
  nickname: string;
  phoneNumber: string;
  email: string;
}

interface PostProfileRequest {
  nickname: string;
  phoneNumber: string;
  email: string;
}

export const postProfile = async (profileData: PostProfileRequest) => {
  const response = await authenticatedApi<PostProfileResponse>({
    method: "POST",
    url: USER_PROFILE_API_PATH,
    data: profileData,
  });

  return response.data;
};
