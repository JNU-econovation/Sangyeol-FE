"use client";

import ROUTE from "@shared/constants/route";
// import useRouteBridge from "@shared/hooks/domain/bridge/useRouteBridge";
import { StackLink } from "stack-link";
import SearchInput from "@shared/components/primitives/ui/SearchInput";
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
        <SearchInput
          placeholder="추후 기능이 활성화 될 예정입니다"
          onFocus={onFocus}
          disabled
        />
      </StackLink>
    </section>
  );
}
