import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 프로필 이미지 API 경로
 */
export const USER_PROFILE_IMAGE_API_PATH = "/api/v1/users/profile/image";

/**
 * @public
 * @category Types
 * @interface GetProfileImageRequest
 * @description 프로필 이미지 업데이트 요청 타입
 * @property {string} imageUrl - 업로드된 이미지 URL
 */
export interface GetProfileImageRequest {
  imageUrl: string;
}

// TODO: api 변경 반영 필요

/**
 * @public
 * @category Users
 * @description 프로필 이미지를 업데이트합니다
 * @param instance - Axios 인스턴스
 * @param body - 이미지 URL 정보
 * @returns 업데이트 결과
 * @example
 * await patchProfileImage(axiosInstance, {
 *   imageUrl: "https://example.com/profile.jpg"
 * });
 */
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

/**
 * @public
 * @category Users
 * @description 프로필 이미지를 삭제합니다
 * @param instance - Axios 인스턴스
 * @returns 삭제 결과
 * @example
 * await deleteProfileImage(axiosInstance);
 */
export const deleteProfileImage = async (instance: AxiosInstance) => {
  const response = await instance({
    method: "DELETE",
    url: USER_PROFILE_IMAGE_API_PATH,
  });

  return response.data;
};
