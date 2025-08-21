"use client";

import ROUTE from "@/constants/route";
// import useRouteBridge from "@/hooks/feature/bridge/useRouteBridge";
import { StackLink } from "@/service/StackLink";
import SearchInput from "@shared/ui/SearchInput";
import { useParams } from "next/navigation";
import { FocusEvent, useCallback } from "react";

export default function CourseSearchBarSection() {
  const { mountainId } = useParams<{ mountainId: string }>();
  // const routeToCourseSearch = useRouteBridge({
  //   path: "course-search",
  //   routeType: "push",
  // });

  const onFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    // routeToCourseSearch();
  }, []);

  return (
    <section>
      <StackLink
        href={ROUTE.MOUNTAIN_COURSE_SEARCH(mountainId)}
        preLoad
        animation="none"
      >
        <SearchInput placeholder="코스 지점 직접 검색" onFocus={onFocus} />
      </StackLink>
    </section>
  );
}
