import authenticatedApi from "@api/_instances/authenticatedApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfileImage, GET_PROFILE_IMAGE_API_PATH } from "api";

const useDeleteProfileImageMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [GET_PROFILE_IMAGE_API_PATH],
    mutationFn: () => deleteProfileImage(authenticatedApi),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_PROFILE_IMAGE_API_PATH],
      });
    },
  });
};

export default useDeleteProfileImageMutate;
