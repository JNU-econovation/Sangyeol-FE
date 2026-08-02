// import TravelWithCourseMapWebview from "@screens/travel/TravelWithCourseMapWebview";
import TravelNavIcon from "@screens/travel/TravelNavIcon";
import TravelWithCourseMap from "@screens/travel/TravelWithCourseMap";
import TravelWithCourseMonitorSection from "@screens/travel/TravelWithCourseMonitorSection";
import TravelWithCourseProcessSection from "@screens/travel/TravelWithCourseProcessSection";
import PositionBottom from "@shared/layout/PositionBottom";
import Spacing from "@shared/layout/Spacing";
import { Suspense } from "react";

const WithCourseTravelScreen = () => {
  return (
    <>
      <Spacing size={16} />
      <Suspense>
        <TravelWithCourseMap />
      </Suspense>
      <TravelNavIcon />
      <PositionBottom bottom={24}>
        <TravelWithCourseMonitorSection />
      </PositionBottom>
      <TravelWithCourseProcessSection />
    </>
  );
};

export default WithCourseTravelScreen;
