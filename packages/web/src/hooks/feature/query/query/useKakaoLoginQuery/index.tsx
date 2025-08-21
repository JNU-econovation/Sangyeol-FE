import { getKakaoLoginApi, KAKAO_LOGIN_URI } from "@api/v1/oauth/kakao";
import { useSuspenseQuery } from "@tanstack/react-query";

const useKakaoLoginQuery = () => {
  return useSuspenseQuery({
    queryKey: [KAKAO_LOGIN_URI],
    queryFn: getKakaoLoginApi,
  });
};

export default useKakaoLoginQuery;
