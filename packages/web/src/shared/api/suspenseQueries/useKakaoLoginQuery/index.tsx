import { useEffect } from "react";
import { getKakaoLoginApi, KAKAO_LOGIN_URI } from "api";
import { useSuspenseQuery } from "@tanstack/react-query";
import publicApi from "@shared/api/_instances/publicApi";

const useKakaoLoginQuery = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === "development" && typeof window !== "undefined") {
      window.location.href =
        "/social-login-loading?accessToken=dev-token&refreshToken=dev-token&accessTokenExpiredTime=9999999999";
    }
  }, []);

  return useSuspenseQuery({
    queryKey: [KAKAO_LOGIN_URI],
    queryFn: () => getKakaoLoginApi(publicApi),
  });
};

export default useKakaoLoginQuery;
