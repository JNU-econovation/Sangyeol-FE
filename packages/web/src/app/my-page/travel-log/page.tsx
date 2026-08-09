import TravelLogCalendarSection from "@modules/widgets/my-info/TravelLogCalendarSection";
import TravelLogHeaderSection from "@modules/widgets/my-info/TravelLogHeaderSection";
import TravelLogListSection from "@modules/widgets/my-info/TravelLogListSection";
import Spacing from "@shared/components/primitives/layout/Spacing";

export default function TravelLogPage() {
  return (
    <>
      <TravelLogHeaderSection />
      <Spacing size={16} />
      <div className="bg-gray-300 max-h-screen overflow-y-scroll">
        <div className="px-5 max-h-screen bg-white">
          <TravelLogCalendarSection />
        </div>
        <Spacing size={2} />
        <div className="px-5 max-h-screen bg-white">
          <TravelLogListSection />
        </div>
        <Spacing size={16} />
      </div>
    </>
  );
}
