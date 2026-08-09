"use client";

import Prefetcher from "@shared/components/composites/Prefetcher";
import useCoursesOfMountainPrefetch from "@shared/api/preFetchs/useCoursesOfMountainPrefetch";

export default function CoursePrefetcher() {
  return (
    <Prefetcher
      hooks={[
        {
          prefetchHook: useCoursesOfMountainPrefetch,
          args: {
            mountainId: "1",
            sortBy: "length",
          },
        },
        {
          prefetchHook: useCoursesOfMountainPrefetch,
          args: {
            mountainId: "1",
            sortBy: "difficulty",
          },
        },
      ]}
    />
  );
}
