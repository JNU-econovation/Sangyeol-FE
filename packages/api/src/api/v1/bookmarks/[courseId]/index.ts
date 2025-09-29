import { AxiosInstance } from "axios";

export const DELETE_BOOKMARK_API_PATH = (courseId: string) =>
  `/api/v1/bookmarks/${courseId}`;

// DELETE
export const deleteBookmarkApi = async (
  instance: AxiosInstance,
  courseId: string,
) => {
  const response = await instance({
    method: "delete",
    url: DELETE_BOOKMARK_API_PATH(courseId),
  });

  return response.data;
};
