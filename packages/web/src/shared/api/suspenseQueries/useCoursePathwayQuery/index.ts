import { getPathwayOfCourse, PATHWAY_API_PATH } from "api";
import { useSuspenseQuery } from "@tanstack/react-query";
import authenticatedApi from "@shared/api/_instances/authenticatedApi";

interface UseCoursePathwayQueryParams {
  courseId: string;
}

const useCoursePathwayQuery = ({ courseId }: UseCoursePathwayQueryParams) => {
  return useSuspenseQuery({
    queryKey: [PATHWAY_API_PATH(courseId)],
    queryFn: () => getPathwayOfCourse(authenticatedApi, courseId),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

export default useCoursePathwayQuery;
