import authenticatedApi from "@api/_instances/authenticatedApi";
import { usePrefetchQuery } from "@tanstack/react-query";
import { getProfileImageSave, PROFILE_IMAGE_API_PATH } from "api";

// 프로필 이미지 조회
const useProfileImageUrlPrefetch = () => {
  return usePrefetchQuery({
    queryKey: [PROFILE_IMAGE_API_PATH],
    queryFn: async () => {
      const res = await getProfileImageSave(authenticatedApi);
      return res.profileImageUrlDTO;
    },
  });
};

export default useProfileImageUrlPrefetch;
