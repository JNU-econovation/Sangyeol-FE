import authenticatedApi from "@/api/_instances/authenticatedApi";

export const DELETE_BOOKMARK_API_PATH = (courseId: string) =>
  `api/v1/bookmarks/${courseId}`;

// DELETE
export const deleteBookmarkApi = async (courseId: string) => {
  const response = await authenticatedApi({
    method: "delete",
    url: DELETE_BOOKMARK_API_PATH(courseId),
  });

  return response.data;
};
