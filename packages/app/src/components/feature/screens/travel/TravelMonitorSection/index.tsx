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

const INTERVAL_CYCLE = 100; // 100 milliseconds

const TravelMonitorSection = () => {
  const [elapsedTime, setElapsedTime] = useState(0); // milliseconds
  const { distance, travelState, getElapsedTime } = useTravelStateStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime());
    }, INTERVAL_CYCLE);
    return () => clearInterval(interval);
  }, [getElapsedTime, travelState]);

  return (
    <Container>
      <Spacing size={24} />
      <ButtonContainer>
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

      <TimeDisplay>{msToTimeText(elapsedTime)}</TimeDisplay>
      <Text textAlign="center" opacity={0.5}>
        산행 시간
      </Text>

      <Spacing size={12} />

      <MetricsContainer>
        <MetricItem>
          <MetricIcon>🏃‍♂️‍➡️</MetricIcon>
          <MetricData>
            <MetricValue>{distance.toFixed(2)}</MetricValue>
            <MetricUnit>km</MetricUnit>
          </MetricData>
        </MetricItem>

        <Divider />

        <MetricItem>
          <MetricIcon>🔥</MetricIcon>
          <MetricValue>03:24</MetricValue>
        </MetricItem>

        <Divider />

        <MetricItem>
          <MetricIcon>⛰️</MetricIcon>
          <MetricValue>01:20</MetricValue>
        </MetricItem>
      </MetricsContainer>

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

const MetricsContainer = styled.View`
  background-color: ${COLORS.green20};
  border-radius: 12px;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MetricItem = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const MetricIcon = styled.Text`
  font-size: 16px;
`;

const MetricData = styled.View`
  align-items: flex-start;
`;

const MetricValue = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${COLORS.black};
`;

const MetricUnit = styled.Text`
  font-size: 12px;
  color: ${COLORS.black};
  text-align: right;
`;

const Divider = styled.View`
  height: 40px;
  width: 1px;
  background-color: ${COLORS.gray20};
  opacity: 0.5;
`;

export default TravelMonitorSection;
