"use client";

import useGetCourseDetails from "@shared/hooks/domain/course/useGetCourseDetails";
import BottomSheet from "@shared/components/composites/BottomSheet";
import Carousel from "@shared/components/composites/Carousel";
import BaseSelector from "@modules/widgets/map/BaseSelector";
import CourseImageInfoSection from "@modules/widgets/map/CourseImageInfoSection";
import CourseWeatherClothesInfoSection from "@modules/widgets/map/CourseWeatherClothesInfoSection";
import Spacing from "@shared/components/primitives/layout/Spacing";
import CourseMetaDataUi from "@shared/components/primitives/ui/CourseMetaDataUi";
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
