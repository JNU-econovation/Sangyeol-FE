import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 닉네임 중복 확인 API 경로를 생성하는 함수
 * @param nickname - 확인할 닉네임
 * @returns API 경로 문자열
 */
export const CHECK_NICKNAME_API_PATH = (nickname: string) =>
  `/api/v1/users/nickname/check?nickname=${encodeURIComponent(nickname)}`;

/**
 * @public
 * @category Types
 * @interface GetCheckNicknameDuplicatedResponse
 * @description 닉네임 중복 확인 응답 타입
 * @property {boolean} isAvailable - 사용 가능 여부 (true: 사용 가능, false: 중복됨)
 */
//TODO: response 타입 변경 반영해야함
export interface GetCheckNicknameDuplicatedResponse {
  isAvailable: boolean;
}

/**
 * @public
 * @category Users
 * @description 닉네임 중복 여부를 확인합니다
 * @param instance - Axios 인스턴스
 * @param nickname - 확인할 닉네임
 * @returns 사용 가능 여부
 * @example
 * const result = await getCheckNicknameDuplicated(axiosInstance, "산악인123");
 * if (result.isAvailable) {
 *   console.log("사용 가능한 닉네임입니다");
 * }
 */
export const getCheckNicknameDuplicated = async (
  instance: AxiosInstance,
  nickname: string,
) => {
  const response = await instance<GetCheckNicknameDuplicatedResponse>({
    method: "get",
    url: CHECK_NICKNAME_API_PATH(nickname),
  });

  return response.data;
};
