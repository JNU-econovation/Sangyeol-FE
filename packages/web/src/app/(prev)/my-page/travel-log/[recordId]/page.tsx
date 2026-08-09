import TravelLogDetailContentSection from "@modules/widgets/my-info/TravelLogDetailContentSection";
import TravelLogDetailCoursesSection from "@modules/widgets/my-info/TravelLogDetailCoursesSection";
import TravelLogDetailHeaderSection from "@modules/widgets/my-info/TravelLogDetailHeaderSection";
import Spacing from "@shared/components/primitives/layout/Spacing";

const TravelLogDetailPage = () => {
  return (
    <>
      <TravelLogDetailHeaderSection />
      <div className="max-h-screen overflow-y-scroll">
        <Spacing size={20} />
        <hr className="border-gray-300" />
        <Spacing size={4} />
        <TravelLogDetailContentSection />
        <Spacing size={2} className="bg-gray-300" />
        <div className="px-6">
          <TravelLogDetailCoursesSection />
        </div>
        <Spacing size={16} />
      </div>
    </>
  );
};

export default TravelLogDetailPage;
