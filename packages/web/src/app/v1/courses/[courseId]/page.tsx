// import MapWithHeaderAndPathSection from "@modules/features/map/MapWithHeaderAndPathSection";
// import CourseDetailBottomSheetSection from "@modules/widgets/mountain/CourseDetailBottomSheetSection";
import MapWithHeaderAndPathSection from "@/modules/features/map/MapWithHeaderAndPathSection";
import CourseDetailBottomSheetSection from "@/modules/widgets/mountain/CourseDetailBottomSheetSection";
import CourseDetailDescriptionRedirectButton from "@/modules/widgets/mountain/CourseDetailDescriptionRedirectButton";
import MapHeaderNavbar from "@shared/components/composites/MapHeaderNavbar";
import PositionBottom from "@shared/components/primitives/layout/PositionBottom";
import SafeArea from "@shared/components/primitives/layout/SafeArea";
import Spacing from "@shared/components/primitives/layout/Spacing";

const CourseDetailsPage = () => {
  return (
    <SafeArea safetyAreaClassName="bg-gray-300">
      <div className="w-screen h-screen">
        <div className="px-6 z-10 fixed w-full">
          <Spacing size={8} />
          <MapHeaderNavbar />
        </div>
        <PositionBottom bottom={40}>
          <div className="px-6">
            <CourseDetailBottomSheetSection />
            <Spacing size={4} />
            <CourseDetailDescriptionRedirectButton />
          </div>
        </PositionBottom>
        <MapWithHeaderAndPathSection />
      </div>
    </SafeArea>
  );
};

export default CourseDetailsPage;
