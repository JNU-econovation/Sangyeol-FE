import MapHeaderNavbar from "@entities/MapHeaderNavbar";
import Spacing from "@shared/layout/Spacing";
import MapWithCurrentPositionSection from "@widgets/map/MapWithCurrentPositionSection";

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
