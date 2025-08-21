import { getPathwayOfCourse, PATHWAY_API_PATH } from "@api/v1/pathways";
import { useSuspenseQuery } from "@tanstack/react-query";

interface UseCoursePathwayQueryParams {
  courseId: string;
}

const useCoursePathwayQuery = ({ courseId }: UseCoursePathwayQueryParams) => {
  return useSuspenseQuery({
    queryKey: [PATHWAY_API_PATH(courseId)],
    queryFn: () => getPathwayOfCourse(courseId),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

export default useCoursePathwayQuery;
