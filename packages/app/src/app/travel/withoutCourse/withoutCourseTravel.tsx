// import TravelWithoutCourseMapWebview from "@screens/travel/TravelWithoutCourseMapWebview";
import TravelMonitorSection from "@screens/travel/TravelMonitorSection";
import TravelWithoutCourseMap from "@screens/travel/TravelWithoutCourseMap";
import PositionBottom from "@shared/layout/PositionBottom";
import Spacing from "@shared/layout/Spacing";

const WithoutCourseTravel = () => {
  return (
    <>
      <Spacing size={16} />
      <TravelWithoutCourseMap />
      <PositionBottom bottom={24}>
        <TravelMonitorSection />
      </PositionBottom>
    </>
  );
};

export default WithoutCourseTravel;
