import { BOOKMARK_API_PATH, getBookmarksApi } from "@/api/v1/bookmarks";
import { useQuery } from "@tanstack/react-query";

const useBookmarkQuery = () => {
  const { data: bookmarks } = useQuery({
    queryKey: [BOOKMARK_API_PATH],
    queryFn: getBookmarksApi,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  return { bookmarks };
};

export default useBookmarkQuery;
