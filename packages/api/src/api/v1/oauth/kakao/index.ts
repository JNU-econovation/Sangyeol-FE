import { AxiosInstance } from "axios";

export const KAKAO_LOGIN_URI = `/api/v1/oauth/kakao/login`;

export interface KakaoLoginResponse {
  uri: string;
}

export const getKakaoLoginApi = async (instance: AxiosInstance) => {
  const response = await instance<KakaoLoginResponse>({
    method: "get",
    url: KAKAO_LOGIN_URI,
  });

  return response.data;
};
