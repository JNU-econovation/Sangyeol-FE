import authenticatedApi from "@api/_instances/authenticatedApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProfile, USER_PROFILE_API_PATH } from "api";

// ! 앱의 경우, 웹과의 일관성을 지키기 위하여 캐싱을 하지 않습니다.

const useProfileQuery = () => {
  return useSuspenseQuery({
    queryKey: [USER_PROFILE_API_PATH],
    queryFn: () => getProfile(authenticatedApi),
    select: (data) => data.userProfileDTO,
  });
};

export default useProfileQuery;
