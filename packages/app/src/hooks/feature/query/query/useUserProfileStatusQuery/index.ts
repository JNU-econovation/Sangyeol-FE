import {
  getProfileStatus,
  USER_PROFILE_STATUS_API_PATH,
} from "@api/v1/users/profile/status";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { useQuery } from "@tanstack/react-query";

const useUserProfileStatusQuery = () => {
  // const { accessToken } = useTokenStore();

  const query = useQuery({
    queryKey: [USER_PROFILE_STATUS_API_PATH],
    queryFn: getProfileStatus,
    // enabled: !!accessToken,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return query;
};

export default useUserProfileStatusQuery;
