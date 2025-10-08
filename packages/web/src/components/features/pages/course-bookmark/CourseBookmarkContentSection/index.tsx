"use client";

import useRouteBridge from "@hooks/feature/bridge/useRouteBridge";
import useGetCourseDetails from "@hooks/feature/course/useGetCourseDetails";
import useBookmarkQuery from "@hooks/feature/query/query/useBookmarkQuery";
import Spacing from "@shared/layout/Spacing";
import CourseList from "@shared/ui/CourseList";
import { Suspense } from "@suspensive/react";
import { Bookmark } from "api";

import CourseBookmarkContentSectionLoader from "./loader";

const CourseBookmarkContentSection = Suspense.with(
  {
    fallback: <CourseBookmarkContentSectionLoader />,
    clientOnly: true,
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
            <CourseBookmarkContentList key={props.id} {...props} />
          ))}
        </ul>
      </section>
    );
  },
);
export default CourseBookmarkContentSection;

// TODO: 따로 뺴기
const CourseBookmarkContentList = ({
  id,
  name,
  image,
  length,
  bookmark,
  duration,
  difficulty,
  mountainId,
}: Bookmark) => {
  const { peakBaseId } = useGetCourseDetails({
    courseId: id,
    mountainId: mountainId,
  });
  const routeToCourseDetail = useRouteBridge({
    routeType: "replace",
    path: "course-detail",
    params: [
      {
        courseId: id,
        mountainId: mountainId,
        params: `tag=BASE&baseId=${peakBaseId}`,
      },
    ],
  });

  return (
    <div onClick={routeToCourseDetail} className="w-full" role="button">
      <CourseList
        key={id}
        name={name}
        length={length}
        imageSrc={image}
        stared={bookmark}
        duration={duration}
        difficulty={difficulty}
      />
    </div>
  );
};
