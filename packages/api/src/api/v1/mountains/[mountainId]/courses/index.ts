import { AxiosInstance } from "axios";
import { Course, CourseSortType } from "@model/course";

export const COURSES_OF_MOUNTAIN_API_PATH = (
  mountainId: string,
  { searchParams }: { searchParams?: { sortBy?: CourseSortType } } = {},
) => {
  const params = new URLSearchParams();
  if (searchParams?.sortBy != null) params.set("sortBy", searchParams.sortBy);
  const query = params.toString();
  return `/api/v1/mountains/${encodeURIComponent(mountainId)}/courses${query ? `?${query}` : ""}`;
};

export interface GetCoursesOfMountainResponse {
  courses: Course[];
}

interface GetCoursesOfMountainApiParams {
  mountainId: string;
  sortBy?: CourseSortType;
}

export const getCoursesOfMountainApi = async (
  instance: AxiosInstance,
  { mountainId, sortBy }: GetCoursesOfMountainApiParams,
) => {
  const response = await instance<GetCoursesOfMountainResponse>({
    method: "get",
    url: COURSES_OF_MOUNTAIN_API_PATH(mountainId, { searchParams: { sortBy } }),
  });

  return response.data;
};
