import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 프로필 작성 상태 API 경로
 */
export const USER_PROFILE_STATUS_API_PATH = "/api/v1/users/profile/status";

/**
 * @public
 * @category Types
 * @interface GetProfileStatusResponse
 * @description 프로필 작성 상태 응답 타입
 * @property {boolean} basicInformation - 기본 정보 작성 여부
 * @property {boolean} personalInformation - 개인 정보 작성 여부
 */
export interface GetProfileStatusResponse {
  basicInformation: boolean;
  personalInformation: boolean;
}

/**
 * @public
 * @category Users
 * @description 사용자의 프로필 작성 상태를 조회합니다
 * @param instance - Axios 인스턴스
 * @returns 프로필 작성 상태
 * @example
 * const status = await getProfileStatus(axiosInstance);
 * if (!status.basicInformation) {
 *   // 기본 정보 작성 화면으로 이동
 * }
 */
export const getProfileStatus = async (instance: AxiosInstance) => {
  const response = await instance<GetProfileStatusResponse>({
    method: "GET",
    url: USER_PROFILE_STATUS_API_PATH,
  });

  return response.data;
};
