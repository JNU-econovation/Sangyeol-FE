import MAP from "@/constants/map";
import ROUTE from "@/constants/route";
import Selector from "@entities/Selector";
import useBasesDetailQuery from "@/hooks/feature/query/query/useBasesDetailQuery";
import { Suspense } from "@suspensive/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default Suspense.with(
  {
    fallback: (
      <div className="h-10 w-full animate-pulse bg-gray-100 rounded-2xl border border-main-green opacity-50" />
    ),
    name: "BaseSelector",
  },
  () => {
    const { mountainId, courseId } = useParams<{
      mountainId: string;
      courseId: string;
    }>();
    const searchParams = useSearchParams();
    const router = useRouter();

    const { data } = useBasesDetailQuery({ mountainId });

    const { baseDetails } = data;

    const options = useMemo(() => {
      return baseDetails.map(({ baseId, name }) => ({
        text: name,
        value: baseId,
      }));
    }, [baseDetails]);

    useEffect(() => {
      if (!searchParams.get("baseId") && baseDetails.length > 0) {
        router.replace(
          ROUTE.MOUNTAIN_COURSE_DETAIL(mountainId, courseId, {
            tag: searchParams.get("tag") ?? MAP.BASE.id,
            baseId: baseDetails[0].baseId,
          })
        );
      }
    }, [mountainId, courseId, searchParams, router, baseDetails]);

    const selectorValue = searchParams.get("baseId");
    if (!selectorValue) {
      return null;
    }

    return (
      <Selector
        options={options}
        value={selectorValue}
        onSelect={(baseId) => {
          router.replace(
            ROUTE.MOUNTAIN_COURSE_DETAIL(mountainId, courseId, {
              tag: searchParams.get("tag") ?? MAP.BASE.id,
              baseId,
            })
          );
        }}
      />
    );
  }
);
