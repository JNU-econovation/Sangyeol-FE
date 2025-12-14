import authenticatedApi from "@api/_instances/authenticatedApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProfileImageUrl, PROFILE_IMAGE_API_PATH } from "api";

// 프로필 이미지 조회
const useProfileImageUrlQuery = () => {
  return useSuspenseQuery({
    queryKey: [PROFILE_IMAGE_API_PATH],
    queryFn: () => getProfileImageUrl(authenticatedApi),
    select: (data) => data.profileImageUrlDTO.profileImageUrl,
  });
};

export default useProfileImageUrlQuery;
