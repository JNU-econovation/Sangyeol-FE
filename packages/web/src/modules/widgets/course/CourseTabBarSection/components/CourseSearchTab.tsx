"use client";

import Spacing from "@shared/components/primitives/layout/Spacing";
import { TAB_TITLE_LIST } from "@shared/constants/course";
import ROUTE from "@shared/constants/route";
import { cn } from "@shared/lib/cn";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const CourseSearchTab = () => {
  const router = useRouter();
  const { mountainId } = useParams<{ mountainId: string }>();
  const searchParams = useSearchParams();
  const sortBy =
    (searchParams.get("sort") as (typeof TAB_TITLE_LIST)[number]["sort"]) ??
    "length";

  return (
    <div className="grid grid-cols-4 gap-1 justify-between items-center px-6">
      {TAB_TITLE_LIST.map(({ title: tabTitle, sort }, index) => (
        <button
          key={`${index}-${tabTitle}`}
          onClick={() => {
            router.replace(`${ROUTE.MOUNTAIN_COURSE(mountainId)}?sort=${sort}`);
          }}
        >
          <div
            className={cn("px-3 py-1 text-white rounded-full text-sm", {
              "bg-gray-700": sort !== sortBy,
              "bg-primary": sort === sortBy,
            })}
          >
            {tabTitle}
          </div>
        </button>
      ))}

      {TAB_TITLE_LIST.map(({ title: tabTitle, sort }, index) => (
        <div key={`${index}-${tabTitle}-underline`}>
          <Spacing size={2} />
          <div
            className={cn("h-1", {
              "bg-primary": sort === sortBy,
            })}
          />
        </div>
      ))}
    </div>
  );
};

export default CourseSearchTab;
