import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description S3 키 저장 API 경로
 */
export const POST_S3_KEY_API_PATH = "/api/v1/users/profile-image/save";

/**
 * @public
 * @category Types
 * @interface PostProfileImageSaveRequest
 * @description 프로필 이미지 S3 키 저장 요청 타입
 * @property {string} fileName - 저장할 파일명
 */
export interface PostProfileImageSaveRequest {
  fileName: string;
}

/**
 * @public
 * @category Types
 * @interface PostProfileImageSaveResponse
 * @description 프로필 이미지 S3 키 저장 응답 타입
 * @property {object} presignedUrlDTO - Presigned URL 정보
 * @property {string} presignedUrlDTO.presignedUrl - S3 업로드용 Presigned URL
 * @property {string} presignedUrlDTO.fileName - 저장된 파일명
 */
export interface PostProfileImageSaveResponse {
  presignedUrlDTO: {
    presignedUrl: string;
    fileName: string;
  };
}

/**
 * @public
 * @category Users
 * @description 프로필 이미지 업로드를 위한 S3 키를 서버에 저장하고 Presigned URL을 받습니다
 * @param instance - Axios 인스턴스
 * @param body - 파일명 정보
 * @returns S3 업로드용 Presigned URL 및 파일명
 * @example
 * const result = await postS3Key(axiosInstance, { fileName: "profile.jpg" });
 * // 반환된 Presigned URL로 이미지 업로드
 * await fetch(result.presignedUrlDTO.presignedUrl, {
 *   method: "PUT",
 *   body: imageFile
 * });
 */
export const postS3Key = async (
  instance: AxiosInstance,
  body: PostProfileImageSaveRequest,
) => {
  const response = await instance<PostProfileImageSaveResponse>({
    method: "POST",
    url: POST_S3_KEY_API_PATH,
    data: { body },
  });

  return response.data;
};
