// import TravelWithoutCourseMapWebview from "@screens/travel/TravelWithoutCourseMapWebview";
import styled from "@emotion/native";
import TravelNavIcon from "@screens/travel/TravelNavIcon";
import TravelWithoutCourseMap from "@screens/travel/TravelWithoutCourseMap";
import TravelWithoutMonitorSection from "@screens/travel/TravelWithoutMonitorSection";
import PositionBottom from "@shared/layout/PositionBottom";
import Spacing from "@shared/layout/Spacing";

const WithoutCourseTravel = () => {
  return (
    <Container>
      <Spacing size={16} />
      <TravelWithoutCourseMap />
      <TravelNavIcon />
      <PositionBottom bottom={24}>
        <TravelWithoutMonitorSection />
      </PositionBottom>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
`;

export default WithoutCourseTravel;
