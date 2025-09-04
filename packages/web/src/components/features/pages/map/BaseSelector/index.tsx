import MAP from "@/constants/map";
import ROUTE from "@/constants/route";
import Selector from "@entities/Selector";
import useGetCourseDetails from "@hooks/feature/course/useGetCourseDetails";
import useBasesDetailQuery from "@hooks/feature/query/query/useBasesDetailQuery";
import { Suspense } from "@suspensive/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default Suspense.with(
  {
    fallback: (
      <div className="h-10 w-full animate-pulse bg-gray-100 rounded-2xl border border-primary opacity-50" />
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
    const { peakBaseId } = useGetCourseDetails({ mountainId, courseId });

    const { baseDetails } = data;

    const options = useMemo(() => {
      return baseDetails.map(({ baseId, name }) => ({
        text: name,
        value: baseId,
      }));
    }, [baseDetails]);

    const selectedBaseId = searchParams.get("baseId");
    if (!selectedBaseId) {
      return null;
    }

    return (
      <div className="relative">
        <Selector
          options={options}
          value={selectedBaseId}
          onSelect={(baseId) => {
            const params = new URLSearchParams(window.location.search);
            if (!params.has("tag")) params.set("tag", MAP.BASE.id);
            params.set("baseId", String(baseId));
            router.replace(`${window.location.pathname}?${params.toString()}`);
          }}
        />
        {+peakBaseId === +selectedBaseId && (
          <div className="absolute top-0 left-4.5 h-full flex items-center pointer-events-none">
            <p className="text-yellow text-xs">pick</p>
          </div>
        )}
      </div>
    );
  },
);
