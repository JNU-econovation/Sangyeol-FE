import { BOOKMARK_API_PATH } from "@/api/v1/bookmarks";
import {
  DELETE_BOOKMARK_API_PATH,
  deleteBookmarkApi,
} from "@/api/v1/bookmarks/[courseId]";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DELETE_BOOKMARK_API_PATH],
    mutationFn: deleteBookmarkApi,
    onSuccess: () => {
      // TODO: 낙관적 업데이트로 변경하기
      queryClient.invalidateQueries({ queryKey: [BOOKMARK_API_PATH] });
    },
  });
};

export default useDeleteBookmarkMutation;
