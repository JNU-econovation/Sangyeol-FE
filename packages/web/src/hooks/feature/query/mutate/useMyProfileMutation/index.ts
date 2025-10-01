import authenticatedApi from "@/api/_instances/authenticatedApi";
import { useMutation } from "@tanstack/react-query";
import { putProfile, PutProfileRequest, USER_PROFILE_API_PATH } from "api";

const useMyProfileMutation = () => {
  return useMutation({
    mutationKey: [USER_PROFILE_API_PATH],
    mutationFn: (profileData: PutProfileRequest) =>
      putProfile(authenticatedApi, profileData),
  });
};

export default useMyProfileMutation;
