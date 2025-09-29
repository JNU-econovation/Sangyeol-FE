import { AxiosInstance } from "axios";
import { Course } from "@model/course";

export const BOOKMARK_API_PATH = "/api/v1/bookmarks";

export interface GetBookmarksResponse {
  bookmarkList: Course[];
}

// GET
export const getBookmarksApi = async (instance: AxiosInstance) => {
  const response = await instance<GetBookmarksResponse>({
    method: "get",
    url: BOOKMARK_API_PATH,
  });
  return response.data;
};

// POST
export const postBookmarkApi = async (
  instance: AxiosInstance,
  courseId: string,
) => {
  const response = await instance<null>({
    method: "post",
    url: BOOKMARK_API_PATH,
    data: {
      courseId,
    },
  });

  return response.data;
};
