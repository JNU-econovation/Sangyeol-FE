import {
  COURSES_OF_MOUNTAIN_API_PATH,
  CourseSortType,
  getCoursesOfMountainApi,
} from "@api/v1/mountains/[mountainId]/courses";
import { useSuspenseQuery } from "@tanstack/react-query";

interface UseCoursesOfMountainQueryProps {
  mountainId: string;
  sortBy: CourseSortType;
}

const useCoursesOfMountainQuery = ({
  mountainId,
  sortBy,
}: UseCoursesOfMountainQueryProps) => {
  return useSuspenseQuery({
    queryKey: [
      COURSES_OF_MOUNTAIN_API_PATH(mountainId, { searchParams: { sortBy } }),
    ],
    queryFn: () => getCoursesOfMountainApi({ mountainId, sortBy }),
    staleTime: 1000 * 60 * 5, // 5m
    gcTime: 1000 * 60 * 60, // 1h
  });
};

export default useCoursesOfMountainQuery;
