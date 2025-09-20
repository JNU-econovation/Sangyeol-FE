import {
  getProfileStatus,
  USER_PROFILE_STATUS_API_PATH,
} from "@api/v1/users/profile/status";
import { useQuery } from "@tanstack/react-query";

const useUserProfileStatusQuery = () => {
  return useQuery({
    queryKey: [USER_PROFILE_STATUS_API_PATH],
    queryFn: getProfileStatus,
  });
};

export default useUserProfileStatusQuery;
