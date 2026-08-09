"use client";

import Spacing from "@shared/components/primitives/layout/Spacing";
import useGetCourseDetails from "@shared/hooks/domain/course/useGetCourseDetails";
import useTravelRecordDetailQuery from "@shared/api/suspenseQueries/useTravelRecordDetailQuery";
import CourseList from "@shared/components/primitives/ui/CourseList";
import { Suspense } from "@suspensive/react";
import { useParams } from "next/navigation";
import useRouteBridge from "@shared/hooks/domain/bridge/useRouteBridge";

const TravelLogDetailCoursesSection = Suspense.with(
  {
    name: "TravelLogDetailCoursesSection",
    fallback: (
      <div className="text-center text-gray-500">
        코스 정보를 불러오는 중...
      </div>
    ),
  },
  () => {
    const { recordId } = useParams<{ recordId: string }>();
    const {
      data: { courseId, mountainId },
    } = useTravelRecordDetailQuery(recordId);

    const courseData = useGetCourseDetails({
      mountainId,
      courseId,
    });

    const routeToCourseDetail = useRouteBridge({
      routeType: "replace",
      path: "course-detail",
      params: [
        {
          courseId,
          mountainId,
          params: `tag=BASE&baseId=${courseData.peakBaseId}`,
        },
      ],
    });

    return (
      <section>
        <Spacing size={4} />
        <h2 className="text-lg font-semibold">산행 코스</h2>
        <div className="shadow-sm rounded-2xl" onClick={routeToCourseDetail}>
          <CourseList
            {...courseData}
            stared={courseData.bookmark}
            imageSrc={courseData.image}
          />
        </div>
      </section>
    );
  },
);

export default TravelLogDetailCoursesSection;
