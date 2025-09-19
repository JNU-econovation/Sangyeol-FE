import styled from "@emotion/native";
import TravelContinueButton from "@screens/travel/TravelContinueButton";
import TravelEndButton from "@screens/travel/TravelEndButton";
import TravelPauseButton from "@screens/travel/TravelPauseButton";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import { msToTimeText } from "@utils/time";
import { useEffect, useState } from "react";

const INTERVAL_CYCLE = 500; // 500 milliseconds

const TravelWithoutMonitorSection = () => {
  const [elapsedTime, setElapsedTime] = useState(0); // milliseconds. 산행 시간
  const { distance, travelState, getElapsedTime } = useTravelStateStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime()); //TODO: 상태를 상태로 넣고 있음. 수정 필요
    }, INTERVAL_CYCLE);
    return () => clearInterval(interval);
  }, [getElapsedTime, travelState]);

  return (
    <Container>
      <Spacing size={24} />
      <ButtonContainer>
        {/* 여행 상태에 따른 버튼 렌더링 */}
        {travelState === "in-progress" && (
          <>
            <TravelPauseButton />
            <TravelEndButton />
          </>
        )}
        {travelState === "paused" && (
          <>
            <TravelContinueButton />
            <TravelEndButton />
          </>
        )}
      </ButtonContainer>

      <TimeDisplay>
        {travelState === "idle" ? "--:--" : msToTimeText(elapsedTime)}
      </TimeDisplay>
      <Text textAlign="center" opacity={0.5}>
        산행 시간
      </Text>

      <Spacing size={12} />

      <TextContainer>
        <Text
          fontSize={24}
          fontWeight="semibold"
          textAlign="center"
          style={{ transform: "translateX(-10px)" }}
        >
          🏃‍➡️ {distance.toFixed(2)} km
        </Text>
      </TextContainer>

      <Spacing size={16} />
    </Container>
  );
};

const Container = styled.View`
  position: relative;
  background-color: ${COLORS.mainWhite};
  border-radius: 12px;
  z-index: 50;
  padding: 0 16px;
  width: 100%;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 24px;
  height: 24px;
  transform: translateY(-32px);
`;

const TimeDisplay = styled.Text`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  color: ${COLORS.black};
`;

const TextContainer = styled.View`
  background-color: ${COLORS.green500};
  border-radius: 12px;
  padding: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default TravelWithoutMonitorSection;
