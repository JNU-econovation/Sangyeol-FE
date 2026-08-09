import MapHeaderNavbar from "@shared/components/composites/MapHeaderNavbar";
import CourseDetailBottomSheetSection from "@modules/widgets/mountain/CourseDetailBottomSheetSection";
import PositionBottom from "@shared/components/primitives/layout/PositionBottom";
import Spacing from "@shared/components/primitives/layout/Spacing";
import { Suspense } from "@suspensive/react";
import MapWithHeaderAndPathSection from "@modules/features/map/MapWithHeaderAndPathSection";
import TravelStartButton from "@modules/features/route/TravelStartButton";

//
export default function CourseDetailPage() {
  return (
    <Suspense clientOnly>
      <div className="w-screen h-screen">
        <div className="px-6 z-10 fixed w-full">
          <Spacing size={8} />
          <MapHeaderNavbar />
        </div>
        <PositionBottom>
          <div className="px-6">
            <CourseDetailBottomSheetSection />
            <Spacing size={10} />
            <TravelStartButton />
          </div>
        </PositionBottom>
        <MapWithHeaderAndPathSection />
      </div>
    </Suspense>
  );
}
