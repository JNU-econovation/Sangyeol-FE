import { AxiosInstance } from "axios";

export const CHECK_NICKNAME_API_PATH = (nickname: string) =>
  `/api/v1/users/nickname/check?nickname=${encodeURIComponent(nickname)}`;

//TODO: response 타입 변경 반영해야함
export interface GetCheckNicknameDuplicatedResponse {
  isAvailable: boolean;
}

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
