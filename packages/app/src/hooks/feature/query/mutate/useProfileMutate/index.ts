import { PostProfileRequest, postProfile, USER_PROFILE_API_PATH } from "api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authenticatedApi from "@api/_instances/authenticatedApi";

const useProfileMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [USER_PROFILE_API_PATH],
    mutationFn: (data: PostProfileRequest) =>
      postProfile(authenticatedApi, data),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: [USER_PROFILE_API_PATH] });
    },
  });
};

export default useProfileMutate;
