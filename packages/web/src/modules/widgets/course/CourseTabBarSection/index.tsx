"use client";

import { Suspense } from "@suspensive/react";

//inner imports
import CourseSearchTab from "./components/CourseSearchTab";
import NoResult from "./components/NoResult";
import SearchedCourseList from "./components/SearchedCourseList";
import CourseTabBarSectionLoader from "./components/loader";
import { useParams } from "next/navigation";
import SwitchCase from "@shared/components/composites/SwitchCase";
import { NO_RESULT_MOUNTAIN_ID } from "@shared/constants/mountain";

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
            [NO_RESULT_MOUNTAIN_ID]: <NoResult />,
          }}
          defaultComponent={<SearchedCourseList />}
        />
      </section>
    );
  },
);
