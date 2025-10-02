import { putProfile, PutProfileRequest, USER_PROFILE_API_PATH } from "api";
import { useMutation } from "@tanstack/react-query";
import authenticatedApi from "@api/_instances/authenticatedApi";

const useProfileMutate = () => {
  return useMutation({
    mutationKey: [USER_PROFILE_API_PATH],
    mutationFn: (data: PutProfileRequest) => putProfile(authenticatedApi, data),
  });
};

export default useProfileMutate;
