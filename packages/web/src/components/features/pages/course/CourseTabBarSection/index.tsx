"use client";

import MAP from "@/constants/map";
import ROUTE from "@/constants/route";
import { StackLink } from "@/service/StackLink";
import { cn } from "@/utils/cn";
import useCoursesOfMountainQuery from "@hooks/feature/query/query/useCoursesOfMountainQuery";
import Spacing from "@shared/layout/Spacing";
import { Suspense } from "@suspensive/react";
import CourseListWithBookmarkMutate from "@widgets/course/CourseListWithBookmarkMutate";
import { useParams, useRouter, useSearchParams } from "next/navigation";

//inner imports
import CourseTabBarSectionLoader from "./loader";

const tabTitleList = [
  { title: "내 맞춤형", sort: "my" },
  { title: "인기순", sort: "popular" },
  { title: "거리순", sort: "length" },
  { title: "난이도순", sort: "difficulty" },
] as const;

export default Suspense.with(
  {
    name: "CourseTabSection",
    clientOnly: true,
    fallback: <CourseTabBarSectionLoader />,
  },
  function CourseTabSection() {
    const router = useRouter();
    const { mountainId } = useParams<{ mountainId: string }>();
    const searchParams = useSearchParams();
    const sortBy = searchParams.get("sort") as
      | (typeof tabTitleList)[number]["sort"]
      | null;

    const { data: courseList } = useCoursesOfMountainQuery({
      mountainId,
      //TODO: 지금은 length, difficulty만 지원하지만, ui가 나오지 않아 우선적으로 다른 정렬 기준의 경우 length로 처리
      // sortBy: sortBy ?? "length",
      sortBy:
        sortBy === "my" || sortBy === "popular" ? "length" : sortBy ?? "length",
    });

    const { courses } = courseList;

    if (!courses) {
      return <div className="text-center text-gray-500">코스가 없습니다.</div>;
    }

    return (
      <section className="flex flex-col flex-1 overflow-hidden">
        <div className="flex justify-between items-center px-6">
          {tabTitleList.map(({ title: tabTitle, sort }, index) => (
            <button
              key={`${index}-${tabTitle}`}
              onClick={() => {
                router.replace(
                  `${ROUTE.MOUNTAIN_COURSE(mountainId)}?sort=${sort}`
                );
              }}
            >
              <div
                className={cn("px-3 py-1 text-white rounded-full text-sm", {
                  "bg-gray-400": sort !== sortBy,
                  "bg-main-green": sort === sortBy,
                })}
              >
                {tabTitle}
              </div>
            </button>
          ))}
        </div>
        <Spacing size={4} />
        <ul className="flex flex-col gap-4 bg-gray-200 p-6 overflow-y-auto flex-1">
          {courses.map(({ id, ...props }, index) => (
            <StackLink
              href={ROUTE.MOUNTAIN_COURSE_DETAIL(mountainId, id, {
                tag: MAP.BASE.id,
              })}
              key={id}
              animation="none"
            >
              <div key={`${id}-${index}`} role="button">
                <CourseListWithBookmarkMutate id={id} {...props} />
              </div>
            </StackLink>
          ))}
        </ul>
      </section>
    );
  }
);
