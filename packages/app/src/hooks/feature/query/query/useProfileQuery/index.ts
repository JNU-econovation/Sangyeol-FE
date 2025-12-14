import authenticatedApi from "@api/_instances/authenticatedApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProfile, USER_PROFILE_API_PATH } from "api";

const useProfileQuery = () => {
  return useSuspenseQuery({
    queryKey: [USER_PROFILE_API_PATH],
    queryFn: () => getProfile(authenticatedApi),
    select: (data) => data.userProfileDTO,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export default useProfileQuery;
