import { getKakaoLoginApi, KAKAO_LOGIN_URI } from "api";
import { useSuspenseQuery } from "@tanstack/react-query";
import publicApi from "@/api/_instances/publicApi";

const useKakaoLoginQuery = () => {
  return useSuspenseQuery({
    queryKey: [KAKAO_LOGIN_URI],
    queryFn: () => getKakaoLoginApi(publicApi),
  });
};

export default useKakaoLoginQuery;
