import authenticatedApi from "@api/_instances/authenticatedApi";
// import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { useQuery } from "@tanstack/react-query";
import { getProfileStatus, USER_PROFILE_STATUS_API_PATH } from "api";

const useUserProfileStatusQuery = () => {
  // const isLoggedIn = Boolean(useTokenStore().accessToken);
  const query = useQuery({
    queryKey: [USER_PROFILE_STATUS_API_PATH],
    queryFn: () => getProfileStatus(authenticatedApi),
    staleTime: Infinity,
    gcTime: Infinity,
    // enabled: isLoggedIn,
  });

  return query;
};

export default useUserProfileStatusQuery;
