import CoursePrefetcher from "@modules/widgets/course/CoursePrefetcher";
import MountainGridSection from "@modules/widgets/course/MountainGridSection";
import MountainSearchBarSection from "@modules/widgets/course/MountainSearchBarSection";
import MountainSearchTitleSection from "@modules/widgets/course/MountainSearchTitleSection";
import Flex from "@shared/components/primitives/layout/Flex";
import Spacing from "@shared/components/primitives/layout/Spacing";

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
