import { BOOKMARK_API_PATH, getBookmarksApi } from "@/api/v1/bookmarks";
import { useSuspenseQuery } from "@tanstack/react-query";

const useBookmarkQuery = () => {
  return useSuspenseQuery({
    queryKey: [BOOKMARK_API_PATH],
    queryFn: getBookmarksApi,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};

export default useBookmarkQuery;
