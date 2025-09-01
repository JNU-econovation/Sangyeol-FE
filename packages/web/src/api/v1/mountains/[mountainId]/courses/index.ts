import authenticatedApi from "@/api/_instances/authenticatedApi";
import type { Course } from "@/types/course";

export type CourseSortType = "length" | "difficulty";

export const COURSES_OF_MOUNTAIN_API_PATH = (
  mountainId: string,
  { searchParams: { sortBy } }: { searchParams: { sortBy: CourseSortType } },
) => `api/v1/mountains/${mountainId}/courses?sort=${sortBy}`;

export interface GetCoursesOfMountainResponse {
  courses: Course[];
}

interface GetCoursesOfMountainApiParams {
  mountainId: string;
  sortBy: CourseSortType;
}

export const getCoursesOfMountainApi = async ({
  mountainId,
  sortBy,
}: GetCoursesOfMountainApiParams) => {
  const response = await authenticatedApi<GetCoursesOfMountainResponse>({
    method: "get",
    url: COURSES_OF_MOUNTAIN_API_PATH(mountainId, { searchParams: { sortBy } }),
  });

  return response.data;
};
