import {
  COURSES_OF_MOUNTAIN_API_PATH,
  CourseSortType,
  getCoursesOfMountainApi,
} from "api";
import { useSuspenseQuery } from "@tanstack/react-query";
import authenticatedApi from "@api/_instances/authenticatedApi";

interface UseCoursesOfMountainQueryProps {
  mountainId: string;
  sortBy?: CourseSortType;
}

const useCoursesOfMountainQuery = ({
  mountainId,
  sortBy,
}: UseCoursesOfMountainQueryProps) => {
  return useSuspenseQuery({
    queryKey: [
      COURSES_OF_MOUNTAIN_API_PATH(mountainId, { searchParams: { sortBy } }),
    ],
    queryFn: () =>
      getCoursesOfMountainApi(authenticatedApi, { mountainId, sortBy }),
    // staleTime: 1000 * 60 * 5, // 5m
    // gcTime: 1000 * 60 * 60, // 1h
  });
};

export default useCoursesOfMountainQuery;
