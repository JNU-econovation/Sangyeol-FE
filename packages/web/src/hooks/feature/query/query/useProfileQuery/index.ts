import authenticatedApi from "@/api/_instances/authenticatedApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProfile, USER_PROFILE_API_PATH } from "api";

// 프로필 조회 (전체)
const useProfileQuery = () => {
  return useSuspenseQuery({
    queryKey: [USER_PROFILE_API_PATH],
    queryFn: () => getProfile(authenticatedApi),
  });
};

export default useProfileQuery;
