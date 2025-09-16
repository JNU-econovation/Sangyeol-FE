// import TravelWithoutCourseMapWebview from "@screens/travel/TravelWithoutCourseMapWebview";
import styled from "@emotion/native";
import TravelMonitorSection from "@screens/travel/TravelMonitorSection";
import TravelNavIcon from "@screens/travel/TravelNavIcon";
import TravelWithoutCourseMap from "@screens/travel/TravelWithoutCourseMap";
import PositionBottom from "@shared/layout/PositionBottom";
import Spacing from "@shared/layout/Spacing";

const WithoutCourseTravel = () => {
  return (
    <Container>
      <Spacing size={16} />
      <TravelWithoutCourseMap />
      <TravelNavIcon />
      <PositionBottom bottom={24}>
        <TravelMonitorSection />
      </PositionBottom>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
`;

export default WithoutCourseTravel;
