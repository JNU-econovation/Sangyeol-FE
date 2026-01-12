"use client";

import { TAB_TITLE_LIST } from "@/constants/course";
import MAP from "@/constants/map";
import ROUTE from "@/constants/route";
import useCoursesOfMountainQuery from "@/hooks/feature/query/query/useCoursesOfMountainQuery";
import CourseListWithBookmarkMutate from "@widgets/course/CourseListWithBookmarkMutate";
import { useParams, useSearchParams } from "next/navigation";
import { StackLink } from "stack-link";

const SearchedCourseList = () => {
  const { mountainId } = useParams<{ mountainId: string }>();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort") as
    | (typeof TAB_TITLE_LIST)[number]["sort"]
    | null;

  const { data: courseList } = useCoursesOfMountainQuery({
    mountainId,
    //TODO: 지금은 length, difficulty만 지원하지만, ui가 나오지 않아 우선적으로 다른 정렬 기준의 경우 length로 처리
    // sortBy: sortBy ?? "length",
    sortBy:
      sortBy === "my" || sortBy === "popular" ? null : (sortBy ?? "length"),
  });

  const { courses } = courseList;

  if (!courses) {
    return <div className="text-center text-gray-500">코스가 없습니다.</div>;
  }

  return (
    <ul className="flex flex-col gap-4 bg-gray-200 p-6 overflow-y-auto flex-1">
      {courses.map(({ id, peakBaseId, ...props }, index) => (
        <StackLink
          href={ROUTE.MOUNTAIN_COURSE_DETAIL(mountainId, id, {
            tag: MAP.BASE.id,
            baseId: peakBaseId,
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
  );
};

export default SearchedCourseList;
