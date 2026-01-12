"use client";

import { Suspense } from "@suspensive/react";

//inner imports
import CourseSearchTab from "./components/CourseSearchTab";
import NoResultUl from "./components/NoResultUl";
import SearchedCourseList from "./components/SearchedCourseList";
import CourseTabBarSectionLoader from "./loader";
import { useParams } from "next/navigation";
import SwitchCase from "@/components/common/entities/SwitchCase";
import { NO_RESULT_MOUNTAIN_ID } from "@/constants/mountain";

export default Suspense.with(
  {
    name: "CourseTabSection",
    clientOnly: true,
    fallback: <CourseTabBarSectionLoader />,
  },
  function CourseTabSection() {
    const { mountainId } = useParams<{ mountainId: string }>();

    return (
      <section className="flex flex-col flex-1 overflow-hidden">
        <CourseSearchTab />
        <SwitchCase
          value={mountainId}
          caseBy={{
            [NO_RESULT_MOUNTAIN_ID]: <NoResultUl />,
          }}
          defaultComponent={<SearchedCourseList />}
        />
      </section>
    );
  },
);
