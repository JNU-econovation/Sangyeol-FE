import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 프로필 이미지 API 경로
 */
export const PROFILE_IMAGE_API_PATH = "/api/v1/users/profile-image";

/**
 * @public
 * @category Types
 * @description 이미지 파일 형식 타입
 */
export type FileFormat = "JPG" | "PNG" | "HEIC";

/**
 * @public
 * @category Types
 * @interface GetProfileImageUrl
 * @description 프로필 이미지 URL 조회 응답 타입
 * @property {object} profileImageUrlDTO - 프로필 이미지 URL 정보
 * @property {string} profileImageUrlDTO.profileImageUrl - 프로필 이미지 URL
 */
export interface GetProfileImageUrl {
  profileImageUrl: string;
}

/**
 * @public
 * @category Types
 * @interface PostProfileImageKeySaveResponse
 * @description 프로필 이미지 업로드를 위한 Presigned URL 응답 타입
 * @property {object} presignedUrlDTO - Presigned URL 정보
 * @property {string} presignedUrlDTO.presignedUrl - S3 업로드용 Presigned URL
 * @property {string} presignedUrlDTO.fileName - 저장될 파일명
 */
export interface PostProfileImageKeySaveResponse {
  presignedUrl: string;
  fileName: string;
}

/**
 * @public
 * @category Users
 * @description 사용자의 프로필 이미지 URL을 조회합니다
 * @param instance - Axios 인스턴스
 * @returns 프로필 이미지 URL
 * @example
 * const result = await getProfileImageUrl(axiosInstance);
 * console.log(result.profileImageUrlDTO.profileImageUrl);
 */
export const getProfileImageUrl = async (instance: AxiosInstance) => {
  const response = await instance<GetProfileImageUrl>({
    method: "GET",
    url: PROFILE_IMAGE_API_PATH,
  });

  return response.data;
};

/**
 * @public
 * @category Users
 * @description 프로필 이미지 업로드를 위한 S3 Presigned URL을 생성합니다
 * @param instance - Axios 인스턴스
 * @param imageFileFormat - 이미지 파일 형식 ("JPG", "PNG", "HEIC")
 * @returns S3 업로드용 Presigned URL 및 파일명
 * @example
 * const result = await postProfileImageSave(axiosInstance, "JPG");
 * // Presigned URL로 이미지 업로드
 * await fetch(result.presignedUrlDTO.presignedUrl, {
 *   method: "PUT",
 *   body: imageFile
 * });
 */
export const postProfileImageSave = async (
  instance: AxiosInstance,
  imageFileFormat: FileFormat,
) => {
  const response = await instance<PostProfileImageKeySaveResponse>({
    method: "POST",
    url: PROFILE_IMAGE_API_PATH,
    data: {
      imageFileFormat,
    },
  });

  return response.data;
};

/**
 * @public
 * @category Users
 * @description 사용자의 프로필 이미지를 삭제합니다
 * @param instance - Axios 인스턴스
 * @returns 삭제 결과
 * @example
 * await deleteProfileImage(axiosInstance);
 */
export const deleteProfileImage = async (instance: AxiosInstance) => {
  const response = await instance<null>({
    method: "DELETE",
    url: PROFILE_IMAGE_API_PATH,
  });

  return response.data;
};
