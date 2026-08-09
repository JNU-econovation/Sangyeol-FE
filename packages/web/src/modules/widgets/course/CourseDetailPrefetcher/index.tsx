"use client";

import Prefetcher from "@shared/components/composites/Prefetcher";
import useBasesDetailPrefetch from "@shared/api/preFetchs/useBasesDetailPrefetch";
import useBasesPrefetch from "@shared/api/preFetchs/useBasesPrefetch";
import useFacilitiesPrefetch from "@shared/api/preFetchs/useFacilitiesPrefetch";
import { useParams } from "next/navigation";

export default function CourseDetailPrefetcher() {
  const { mountainId } = useParams<{ mountainId: string }>();

  return (
    <Prefetcher
      hooks={[
        { prefetchHook: useBasesPrefetch, args: { mountainId } },
        { prefetchHook: useBasesDetailPrefetch, args: { mountainId } },
        { prefetchHook: useFacilitiesPrefetch, args: { mountainId } },
      ]}
    />
  );
}
