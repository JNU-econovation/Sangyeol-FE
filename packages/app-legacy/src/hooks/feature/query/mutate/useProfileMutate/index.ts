import authenticatedApi from "@api/_instances/authenticatedApi";
import { useMutation } from "@tanstack/react-query";
import { postProfile, PostProfileRequest, USER_PROFILE_API_PATH } from "api";

const useProfileMutate = () => {
  return useMutation({
    mutationKey: [USER_PROFILE_API_PATH],
    mutationFn: (data: PostProfileRequest) =>
      postProfile(authenticatedApi, data),
  });
};

export default useProfileMutate;
