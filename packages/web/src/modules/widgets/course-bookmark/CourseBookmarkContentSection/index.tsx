"use client";

import useBookmarkMutation from "@shared/api/mutates/useBookmarkMutation";
import useDeleteBookmarkMutation from "@shared/api/mutates/useDeleteBookmarkMutation";
import useRouteBridge from "@shared/hooks/domain/bridge/useRouteBridge";
import useGetCourseDetails from "@shared/hooks/domain/course/useGetCourseDetails";
import useBookmarkQuery from "@shared/api/suspenseQueries/useBookmarkQuery";
import Spacing from "@shared/components/primitives/layout/Spacing";
import CourseList from "@shared/components/primitives/ui/CourseList";
import { Suspense } from "@suspensive/react";
import { Bookmark } from "api";

import CourseBookmarkContentSectionLoader from "./components/loader";

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
      <section className="grow h-full">
        <ul className="flex h-full flex-col grow overflow-y-auto px-6 gap-4">
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
  const { mutate: postBookmark } = useBookmarkMutation({
    mountainId,
  });
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation({
    mountainId,
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
        onSetStared={() => postBookmark(id)}
        onResetStared={() => deleteBookmark(id)}
      />
    </div>
  );
};
