import authenticatedApi from "@api/_instances/authenticatedApi";
import { useQuery } from "@tanstack/react-query";
import { getProfileStatus, USER_PROFILE_STATUS_API_PATH } from "api";

const useUserProfileStatusQuery = () => {
  const query = useQuery({
    queryKey: [USER_PROFILE_STATUS_API_PATH],
    queryFn: () => getProfileStatus(authenticatedApi),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return query;
};

export default useUserProfileStatusQuery;
