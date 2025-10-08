import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 사용자 프로필 API 경로
 */
export const USER_PROFILE_API_PATH = "/api/v1/users/profile";

/**
 * @public
 * @category Types
 * @interface GetProfileResponse
 * @description 프로필 조회 응답 타입
 * @property {string} name - 이름
 * @property {string} nickname - 닉네임
 * @property {string} phoneNumber - 휴대폰 번호
 * @property {string} imageUrl - 프로필 이미지 URL
 * @property {string} email - 이메일
 * @property {number} height - 키
 * @property {number} weight - 몸무게
 * @property {"A" | "B" | "AB" | "O"} bloodType - 혈액형
 * @property {string} etc - 기타 정보
 */
//TODO: api 변경 반영 필요
export interface GetProfileResponse {
  userProfileDTO: {
    name: string;
    nickname: string;
    phoneNumber: string;
    imageUrl: string;
    email: string;
    height: number;
    weight: number;
    bloodType: "A" | "B" | "AB" | "O";
    etc: string;
  };
}

/**
 * @public
 * @category Types
 * @interface PutProfileRequest
 * @description 프로필 수정 요청 타입
 * @property {string} nickname - 닉네임
 * @property {string} phoneNumber - 휴대폰 번호
 * @property {string} email - 이메일
 * @property {number} [height] - 키 (선택)
 * @property {number} [weight] - 몸무게 (선택)
 * @property {"A" | "B" | "AB" | "O"} [bloodType] - 혈액형 (선택)
 * @property {string} etc - 기타 정보
 */
export interface PostProfileRequest {
  name: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  height?: number;
  weight?: number;
  bloodType?: "A" | "B" | "AB" | "O";
  etc: string;
}

/**
 * @public
 * @category Users
 * @description 사용자의 프로필 정보를 조회합니다
 * @param instance - Axios 인스턴스
 * @returns 프로필 정보
 * @example
 * const profile = await getProfile(axiosInstance);
 * console.log(profile.nickname);
 */
export const getProfile = async (instance: AxiosInstance) => {
  const response = await instance<GetProfileResponse>({
    method: "GET",
    url: USER_PROFILE_API_PATH,
  });

  return response.data;
};

/**
 * @public
 * @category Users
 * @description 사용자의 프로필 정보를 수정합니다
 * @param instance - Axios 인스턴스
 * @param profileData - 수정할 프로필 데이터
 * @returns 수정된 프로필 정보
 * @example
 * await putProfile(axiosInstance, {
 *   nickname: "산악인",
 *   phoneNumber: "01012345678",
 *   email: "user@example.com",
 *   height: 175,
 *   weight: 70,
 *   bloodType: "A",
 *   etc: "기타 정보"
 * });
 */
export const postProfile = async (
  instance: AxiosInstance,
  profileData: PostProfileRequest,
) => {
  const response = await instance({
    method: "POST",
    url: USER_PROFILE_API_PATH,
    data: profileData,
  });

  return response.data;
};
