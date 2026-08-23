"use client";

// import useGetCourseDetails from "@shared/hooks/domain/course/useGetCourseDetails";
import BottomSheet from "@shared/components/composites/BottomSheet";
import Carousel from "@shared/components/composites/Carousel";
// import BaseSelector from "@modules/widgets/map/BaseSelector";
import CourseImageInfoSection from "@modules/widgets/map/CourseImageInfoSection";
import CourseWeatherClothesInfoSection from "@modules/widgets/map/CourseWeatherClothesInfoSection";
import Spacing from "@shared/components/primitives/layout/Spacing";
import CourseMetaDataUi from "@shared/components/primitives/ui/CourseMetaDataUi";
import { useParams } from "next/navigation";
import { getCourseById } from "@/shared/api/proto";
import Button from "@/shared/components/primitives/ui/Button";

export default function CourseDetailBottomSheetSection() {
  const { courseId } = useParams<{
    courseId: string;
  }>();

  if (!courseId) {
    return null;
  }

  const { difficulty, durationMinutes, distanceKm } = getCourseById(courseId);

  return (
    <section>
      <BottomSheet>
        <Spacing size={4} />

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">당산나무 코스</h3>
            {/* 어떤 정보를 뜻하는지 확인 필요 */}

            <CourseMetaDataUi
              difficulty={difficulty}
              distance={distanceKm}
              time={durationMinutes}
            />
          </div>
          <Button className="h-full font-light text-sm round">길찾기</Button>
        </div>
        <Spacing size={4} />

        <Carousel
          items={[
            <CourseImageInfoSection key="image" />,
            <CourseWeatherClothesInfoSection key="weather" />,
          ]}
        />
        <Spacing size={4} />
        <Button fullWidth>코스 상세보기</Button>
        <Spacing size={4} />
      </BottomSheet>
    </section>
  );
}
