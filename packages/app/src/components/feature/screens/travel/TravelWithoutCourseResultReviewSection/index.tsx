import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import { msToTimeText } from "@utils/time";

const TravelWithoutCourseResultReviewSection = () => {
  const { getElapsedTime, distance } = useTravelStateStore();

  return (
    <Container>
      <Spacing size={23} />
      <TextContainer>
        <Text fontWeight="semibold" fontSize={30}>
          🔥 {msToTimeText(getElapsedTime())}
        </Text>
        <Spacing size={15} />
        <Text fontWeight="semibold" fontSize={30}>
          🏃‍➡️ {distance}KM
        </Text>
      </TextContainer>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${COLORS.mainWhite};
  z-index: 50;
  display: flex;
  width: 100%;
  height: 220px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  transform: translateX(-10px);
`;

export default TravelWithoutCourseResultReviewSection;
