import CourseDescriptionHeaderSection from "@modules/widgets/course-description/CourseDescriptionHeaderSection";
import CourseHeroSection from "@modules/widgets/course-description/CourseHeroSection";
import CourseIntroSection from "@modules/widgets/course-description/CourseIntroSection";
import CourseJourneySection from "@modules/widgets/course-description/CourseJourneySection";
import CourseTipSection from "@modules/widgets/course-description/CourseTipSection";
import SafeArea from "@shared/components/primitives/layout/SafeArea";

// TODO: courseId 기반 API 연동 시 하드코딩된 당산나무 코스 하드코딩 데이터 제거
const CourseDetailDescriptionPage = () => {
  return (
    <SafeArea
      safetyAreaClassName="bg-main-white"
      contentClassName="bg-main-white"
      bottomSpacing={8}
    >
      <div className="flex flex-col gap-6 px-5 pt-4 pb-6 bg-main-white">
        <CourseDescriptionHeaderSection />

        <CourseHeroSection />
        <CourseIntroSection />
        <CourseJourneySection />
        <CourseTipSection />
      </div>
    </SafeArea>
  );
};

export default CourseDetailDescriptionPage;
