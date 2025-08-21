import Spacing from "@/components/common/shared/layout/Spacing";
import TravelLogCalendarSection from "@pages/my-info/TravelLogCalendarSection";
import TravelLogHeaderSection from "@pages/my-info/TravelLogHeaderSection";

export default function TravelLogPage() {
  return (
    <div className="px-7 max-h-screen overflow-y-auto">
      <TravelLogHeaderSection />
      <Spacing size={2} />
      <TravelLogCalendarSection />
    </div>
  );
}
