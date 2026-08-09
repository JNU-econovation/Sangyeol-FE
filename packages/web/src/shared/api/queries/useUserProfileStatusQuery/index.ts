import {
  getProfileStatus,
  USER_PROFILE_STATUS_API_PATH,
} from "api";
import { useQuery } from "@tanstack/react-query";
import authenticatedApi from "@shared/api/_instances/authenticatedApi";

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
