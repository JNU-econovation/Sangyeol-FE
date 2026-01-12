// import CourseSearchBarSection from "@pages/course/CourseSearchNarSection";
import CourseDetailPrefetcher from "@pages/course/CourseDetailPrefetcher";
import CourseTabSection from "@pages/course/CourseTabBarSection";
import Flex from "@shared/layout/Flex";
import Spacing from "@shared/layout/Spacing";
import BackButton from "@widgets/route/BackButton";

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
