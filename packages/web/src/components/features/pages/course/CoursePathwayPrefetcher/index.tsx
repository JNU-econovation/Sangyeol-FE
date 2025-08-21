import Prefetcher from "@entities/Prefetcher";
import useCoursePathwayPrefetch from "@hooks/feature/query/prefetch/useCoursePathwayPrefetch";

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
