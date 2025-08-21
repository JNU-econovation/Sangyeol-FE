"use client";

import Prefetcher from "@entities/Prefetcher";
import useBasesDetailPrefetch from "@hooks/feature/query/prefetch/useBasesDetailPrefetch";
import useBasesPrefetch from "@hooks/feature/query/prefetch/useBasesPrefetch";
import useFacilitiesPrefetch from "@hooks/feature/query/prefetch/useFacilitiesPrefetch";
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
