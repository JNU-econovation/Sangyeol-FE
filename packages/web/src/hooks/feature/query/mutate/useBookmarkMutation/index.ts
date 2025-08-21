import { BOOKMARK_API_PATH, postBookmarkApi } from "@/api/v1/bookmarks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [BOOKMARK_API_PATH],
    mutationFn: postBookmarkApi,
    onSuccess: () => {
      // TODO: 낙관적 업데이트로 변경하기
      queryClient.invalidateQueries({ queryKey: [BOOKMARK_API_PATH] });
    },
  });
};

export default useBookmarkMutation;
