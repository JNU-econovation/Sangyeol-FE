import authenticatedApi from "@/api/_instances/authenticatedApi";
import { Course } from "@/types/course";

export const BOOKMARK_API_PATH = "api/v1/bookmarks";

interface GetBookmarksResponse {
  bookmarkList: Course[];
}

// GET
export const getBookmarksApi = async () => {
  const response = await authenticatedApi<GetBookmarksResponse>({
    method: "get",
    url: BOOKMARK_API_PATH,
  });

  return response.data;
};

// POST
export const postBookmarkApi = async (courseId: string) => {
  const response = await authenticatedApi<null>({
    method: "post",
    url: BOOKMARK_API_PATH,
    data: {
      courseId,
    },
  });

  return response.data;
};
