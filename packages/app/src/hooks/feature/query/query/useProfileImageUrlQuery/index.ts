import authenticatedApi from "@api/_instances/authenticatedApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProfileImageSave, GET_PROFILE_IMAGE_API_PATH } from "api";

const useProfileImageUrlQuery = () => {
  return useSuspenseQuery({
    queryKey: [GET_PROFILE_IMAGE_API_PATH],
    queryFn: () => getProfileImageSave(authenticatedApi),
    select: (data) => data.profileImageUrlDTO.profileImageUrl,
  });
};

export default useProfileImageUrlQuery;
