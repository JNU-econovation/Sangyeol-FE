"use client";

import useBookmarkQuery from "@hooks/feature/query/query/useBookmarkQuery";
import Spacing from "@shared/layout/Spacing";
import CourseList from "@shared/ui/CourseList";
import { Suspense } from "@suspensive/react";

import CourseBookmarkContentSectionLoader from "./loader";

const CourseBookmarkContentSection = Suspense.with(
  {
    fallback: <CourseBookmarkContentSectionLoader />,
  },

  () => {
    const {
      data: { bookmarkList },
    } = useBookmarkQuery();

    return (
      <section className="bg-gray-600 grow">
        <ul className="flex flex-col bg-gray-600 grow overflow-y-auto px-6 gap-4">
          <Spacing size={4} />
          {bookmarkList.map((props) => (
            <CourseList
              key={props.id}
              stared
              imageSrc={props.image}
              {...props}
            />
          ))}
        </ul>
      </section>
    );
  },
);
export default CourseBookmarkContentSection;
