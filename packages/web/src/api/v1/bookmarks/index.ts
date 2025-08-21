import authenticatedApi from "@/api/_instances/authenticatedApi";

export const BOOKMARK_API_PATH = "api/v1/bookmarks";

// GET
export const getBookmarksApi = async () => {
  const response = await authenticatedApi({
    method: "get",
    url: BOOKMARK_API_PATH,
  });

  return response.data;
};

// POST
export const postBookmarkApi = async (courseId: string) => {
  const response = await authenticatedApi({
    method: "post",
    url: BOOKMARK_API_PATH,
    data: {
      courseId,
    },
  });

  return response.data;
};
