import { AxiosInstance } from "axios";

export const USER_PROFILE_IMAGE_API_PATH = "/api/v1/users/profile/image";

export interface GetProfileImageRequest {
  imageUrl: string;
}

// TODO: api 변경 반영 필요

// [patch] 프로필 사진 업데이트
export const patchProfileImage = async (
  instance: AxiosInstance,
  body: GetProfileImageRequest,
) => {
  const response = await instance({
    method: "PATCH",
    url: USER_PROFILE_IMAGE_API_PATH,
    data: body,
  });

  return response.data;
};

// [delete] 프로필 사진 삭제
export const deleteProfileImage = async (instance: AxiosInstance) => {
  const response = await instance({
    method: "DELETE",
    url: USER_PROFILE_IMAGE_API_PATH,
  });

  return response.data;
};
