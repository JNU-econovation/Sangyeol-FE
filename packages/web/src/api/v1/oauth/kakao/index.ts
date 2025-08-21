import publicApi from "@api/_instances/publicApi";

export const KAKAO_LOGIN_URI = `api/v1/oauth/kakao/login`;

interface KakaoLoginResponse {
  uri: string;
}

export const getKakaoLoginApi = async () => {
  const response = await publicApi<KakaoLoginResponse>({
    method: "get",
    url: KAKAO_LOGIN_URI,
  });

  return response.data;
};
