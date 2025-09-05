/* eslint-disable react/jsx-key */
"use client";

import useGetCourseDetails from "@hooks/feature/course/useGetCourseDetails";
import BottomSheet from "@entities/BottomSheet";
import Carousel from "@entities/Carousel";
import BaseSelector from "@pages/map/BaseSelector";
import CourseImageInfoSection from "@pages/map/CourseImageInfoSection";
import CourseWeatherClothesInfoSection from "@pages/map/CourseWeatherClothesInfoSection";
import Spacing from "@shared/layout/Spacing";
import CourseMetaDataUi from "@shared/ui/CourseMetaDataUi";
import { useParams } from "next/navigation";

export default function CourseDetailBottomSheetSection() {
  const { mountainId, courseId } = useParams<{
    mountainId: string;
    courseId: string;
  }>();

  const { difficulty, duration, length } = useGetCourseDetails({
    mountainId,
    courseId,
  });

  return (
    <section>
      <BottomSheet>
        {/* TODO: 해당 div는 이미 query가 존재하는 경우 bottomsheet의 height를 잘못 계산하는 경우가 존재하여 생상혀였습니다. 추후 변경 예정 */}
        <div className="min-h-6">
          <BaseSelector />
        </div>
        <Spacing size={4} />
        <CourseMetaDataUi
          difficulty={difficulty}
          distance={length}
          time={duration}
        />
        <Spacing size={4} />

        <Carousel
          items={[
            <CourseWeatherClothesInfoSection />,
            <CourseImageInfoSection />,
          ]}
        />
        <Spacing size={4} />
      </BottomSheet>
    </section>
  );
}
