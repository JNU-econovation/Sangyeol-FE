import TravelWithoutCourseMapWebview from "@screens/travel/TravelWithoutCourseMapWebview";
import TravelMonitorSection from "@screens/travel/TravelMonitorSection";
import PositionBottom from "@shared/layout/PositionBottom";
import Spacing from "@shared/layout/Spacing";

const WithoutCourseTravel = () => {
  return (
    <>
      <Spacing size={16} />
      <TravelWithoutCourseMapWebview />
      <PositionBottom bottom={24}>
        <TravelMonitorSection />
      </PositionBottom>
    </>
  );
};

export default WithoutCourseTravel;
