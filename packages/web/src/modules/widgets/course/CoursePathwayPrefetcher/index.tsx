import Prefetcher from "@shared/components/composites/Prefetcher";
import useCoursePathwayPrefetch from "@shared/api/preFetchs/useCoursePathwayPrefetch";

interface CoursePathwayPrefetcherProps {
  courseId: string;
}

export default function CoursePathwayPrefetcher({
  courseId,
}: CoursePathwayPrefetcherProps) {
  return (
    <Prefetcher
      hooks={[{ prefetchHook: useCoursePathwayPrefetch, args: { courseId } }]}
    />
  );
}
