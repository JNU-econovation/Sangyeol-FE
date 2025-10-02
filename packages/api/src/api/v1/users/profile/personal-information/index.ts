import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 프로필 개인 정보 API 경로
 */
export const USER_PERSONAL_INFORMATION_API_PATH =
  "/api/v1/users/profile/personal-information";

/**
 * @public
 * @category Types
 * @interface PostUserPersonalInformationRequest
 * @description 프로필 개인 정보 작성 요청 타입
 * @property {string} name - 이름
 * @property {number} weight - 몸무게 (kg)
 * @property {number} height - 키 (cm)
 * @property {"A" | "B" | "AB" | "O"} bloodType - 혈액형
 */
export interface PostUserPersonalInformationRequest {
  name: string;
  weight: number;
  height: number;
  bloodType: "A" | "B" | "AB" | "O";
}

/**
 * @public
 * @category Types
 * @interface PostUserPersonalInformationResponse
 * @description 프로필 개인 정보 작성 응답 타입
 * @property {string} name - 이름
 * @property {number} weight - 몸무게 (kg)
 * @property {number} height - 키 (cm)
 * @property {"A" | "B" | "AB" | "O"} bloodType - 혈액형
 */
export interface PostUserPersonalInformationResponse {
  name: string;
  weight: number;
  height: number;
  bloodType: "A" | "B" | "AB" | "O";
}

//TODO: api 변경 반영 필요

/**
 * @public
 * @category Users
 * @description 프로필 개인 정보를 작성합니다 (회원가입 시)
 * @param instance - Axios 인스턴스
 * @param body - 개인 정보 데이터
 * @returns 작성된 개인 정보
 * @example
 * const result = await postUserPersonalInformation(axiosInstance, {
 *   name: "김철수",
 *   weight: 70,
 *   height: 175,
 *   bloodType: "A"
 * });
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
