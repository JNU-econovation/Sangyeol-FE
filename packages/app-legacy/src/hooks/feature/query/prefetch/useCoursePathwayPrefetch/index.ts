import { getPathwayOfCourse, PATHWAY_API_PATH } from "api";
import { usePrefetchQuery } from "@tanstack/react-query";
import authenticatedApi from "@api/_instances/authenticatedApi";

interface UseCoursePathwayPrefetchProps {
  courseId: string;
}

const useCoursePathwayPrefetch = ({
  courseId,
}: UseCoursePathwayPrefetchProps) => {
  return usePrefetchQuery({
    queryKey: [PATHWAY_API_PATH(courseId)],
    queryFn: () => getPathwayOfCourse(authenticatedApi, courseId),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

export default useCoursePathwayPrefetch;
