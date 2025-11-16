"use client";

import Prefetcher from "@entities/Prefetcher";
import useCoursesOfMountainPrefetch from "@hooks/feature/query/prefetch/useCoursesOfMountainPrefetch";
import { useEffect } from "react";

export default function CoursePrefetcher() {
  useEffect(() => {
    setInterval(() => {
      console.log("CoursePrefetcher mounted: Prefetching course data...");
    }, 3000);
  }, []);

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
