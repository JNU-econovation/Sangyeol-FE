import { BOOKMARK_API_PATH, getBookmarksApi } from "api";
import { useSuspenseQuery } from "@tanstack/react-query";
import authenticatedApi from "@api/_instances/authenticatedApi";

const useBookmarkQuery = () => {
  return useSuspenseQuery({
    queryKey: [BOOKMARK_API_PATH],
    queryFn: () => getBookmarksApi(authenticatedApi),
    // staleTime: 1000 * 60 * 60,
    // gcTime: 1000 * 60 * 60,
  });
};

export default useBookmarkQuery;
