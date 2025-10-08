import authenticatedApi from "@/api/_instances/authenticatedApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProfile, PostProfileRequest, USER_PROFILE_API_PATH } from "api";

// 프로필 수정 (전체)
const useMyProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [USER_PROFILE_API_PATH],
    mutationFn: (profileData: PostProfileRequest) => {
      return postProfile(authenticatedApi, profileData);
    },

    onSuccess: () => {
      // TODO: 낙관적 업데이트로 변경하기
      queryClient.invalidateQueries({ queryKey: [USER_PROFILE_API_PATH] });
    },
  });
};

export default useMyProfileMutation;
