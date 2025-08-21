import CoursePrefetcher from "@pages/course/CoursePrefetcher";
import MountainGridSection from "@pages/course/MountainGridSection";
import MountainSearchBarSection from "@pages/course/MountainSearchBarSection";
import MountainSearchTitleSection from "@pages/course/MountainSearchTitleSection";
import Flex from "@shared/layout/Flex";
import Spacing from "@shared/layout/Spacing";

export default function CoursePage() {
  return (
    <>
      <Flex flexDirection="flex-col" height="screen">
        <div className="px-6 pt-18 flex flex-col">
          <MountainSearchTitleSection />
          <Spacing size={8} />
          <MountainSearchBarSection />
        </div>
        <Spacing size={8} />
        <div className="px-6 overflow-auto">
          <MountainGridSection />
        </div>
      </Flex>
      <CoursePrefetcher />
    </>
  );
}
