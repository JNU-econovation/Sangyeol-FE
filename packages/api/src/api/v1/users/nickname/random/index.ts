import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 랜덤 닉네임 생성 API 경로
 */
export const RANDOM_NICKNAME_API_PATH = `/api/v1/users/nickname/random`;

/**
 * @public
 * @category Types
 * @interface GetRandomNicknameResponse
 * @description 랜덤 닉네임 생성 응답 타입
 * @property {string} nickname - 생성된 랜덤 닉네임
 */
export interface GetRandomNicknameResponse {
  nickname: string;
}

/**
 * @public
 * @category Users
 * @description 랜덤 닉네임을 생성합니다
 * @param instance - Axios 인스턴스
 * @returns 생성된 랜덤 닉네임
 * @example
 * const result = await getRandomNickname(axiosInstance);
 * console.log(result.nickname); // "용감한등산가123"
 */
export const getRandomNickname = async (instance: AxiosInstance) => {
  const response = await instance<GetRandomNicknameResponse>({
    method: "get",
    url: RANDOM_NICKNAME_API_PATH,
  });

  return response.data;
};
