import MapHeaderNavbar from "@shared/components/composites/MapHeaderNavbar";
import Spacing from "@shared/components/primitives/layout/Spacing";
import MapWithCurrentPositionSection from "@modules/features/map/MapWithCurrentPositionSection";

export default function MapPage() {
  return (
    <div className="relative w-screen h-screen px-6">
      <div className="z-10 fixed">
        <Spacing size={8} />
        <MapHeaderNavbar />
      </div>
      <MapWithCurrentPositionSection />
    </div>
  );
}
