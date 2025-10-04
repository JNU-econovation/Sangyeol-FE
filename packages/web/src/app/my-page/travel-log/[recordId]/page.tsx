import TravelLogDetailContentSection from "@pages/my-info/TravelLogDetailContentSection";
import TravelLogDetailCoursesSection from "@pages/my-info/TravelLogDetailCoursesSection";
import TravelLogDetailHeaderSection from "@pages/my-info/TravelLogDetailHeaderSection";
import Spacing from "@shared/layout/Spacing";

const TravelLogDetailPage = () => {
  return (
    <>
      <TravelLogDetailHeaderSection />
      <Spacing size={20} />
      <hr className="border-gray-300" />
      <Spacing size={8} />
      <TravelLogDetailContentSection />
      <Spacing size={2} className="bg-gray-300" />
      <div className="px-6">
        <TravelLogDetailCoursesSection />
      </div>
    </>
  );
};

export default TravelLogDetailPage;
