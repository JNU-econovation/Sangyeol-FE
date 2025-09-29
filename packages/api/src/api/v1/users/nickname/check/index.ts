import { AxiosInstance } from "axios";

export const CHECK_NICKNAME_API_PATH = (nickname: string) =>
  `/api/v1/users/nickname/check?nickname=${encodeURIComponent(nickname)}`;

export interface GetCheckNicknameDuplicatedResponse {
  isDuplicated: boolean;
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
