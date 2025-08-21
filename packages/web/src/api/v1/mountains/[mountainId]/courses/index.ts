import authenticatedApi from "@/api/_instances/authenticatedApi";
import { CourseDifficulty } from "@/types/course";

export type CourseSortType = "length" | "difficulty";

export const COURSES_OF_MOUNTAIN = (
  mountainId: string,
  { searchParams: { sortBy } }: { searchParams: { sortBy: CourseSortType } }
) => `api/v1/mountains/${mountainId}/courses?sort=${sortBy}`;

interface Course {
  id: string;
  name: string;
  length: number;
  duration: number;
  difficulty: CourseDifficulty;
  bookmark: boolean;
  image: string;
}

interface GetCoursesOfMountainResponse {
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
    url: COURSES_OF_MOUNTAIN(mountainId, { searchParams: { sortBy } }),
  });

  return response.data;
};
