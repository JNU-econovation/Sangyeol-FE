import { postProfile, USER_PROFILE_API_PATH } from "@api/v1/users/profile";
import { useMutation } from "@tanstack/react-query";

const useProfileMutate = () => {
  return useMutation({
    mutationKey: [USER_PROFILE_API_PATH],
    mutationFn: postProfile,
  });
};

export default useProfileMutate;
