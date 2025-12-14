import authenticatedApi from "@api/_instances/authenticatedApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfileImage, PROFILE_IMAGE_API_PATH } from "api";

const useDeleteProfileImageMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [PROFILE_IMAGE_API_PATH],
    mutationFn: () => deleteProfileImage(authenticatedApi),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PROFILE_IMAGE_API_PATH],
      });
    },
  });
};

export default useDeleteProfileImageMutate;
