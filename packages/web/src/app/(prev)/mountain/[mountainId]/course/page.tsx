// import CourseSearchBarSection from "@modules/widgets/course/CourseSearchNarSection";
import CourseDetailPrefetcher from "@modules/widgets/course/CourseDetailPrefetcher";
import CourseTabSection from "@modules/widgets/course/CourseTabBarSection";
import Flex from "@shared/components/primitives/layout/Flex";
import Spacing from "@shared/components/primitives/layout/Spacing";
import BackButton from "@modules/features/route/BackButton";

export default function MountainCoursePage() {
  return (
    <>
      <Flex flexDirection="flex-col" height={"screen"}>
        <Flex flexDirection="flex-col">
          <div className="px-6 pt-12">
            <BackButton />
            <Spacing size={4} />
          </div>
        </Flex>
        <CourseTabSection />
      </Flex>
      <CourseDetailPrefetcher />
    </>
  );
}
