import { PostProfileRequest, postProfile, USER_PROFILE_API_PATH } from "api";
import { useMutation } from "@tanstack/react-query";
import authenticatedApi from "@api/_instances/authenticatedApi";

const useProfileMutate = () => {
  return useMutation({
    mutationKey: [USER_PROFILE_API_PATH],
    mutationFn: (data: PostProfileRequest) =>
      postProfile(authenticatedApi, data),
  });
};

export default useProfileMutate;
