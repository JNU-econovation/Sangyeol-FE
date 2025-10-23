import styled from "@emotion/native";
import TravelContinueButton from "@screens/travel/TravelContinueButton";
import TravelEndButton from "@screens/travel/TravelEndButton";
import TravelPauseButton from "@screens/travel/TravelPauseButton";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import { msToTimeText } from "@utils/time";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

const INTERVAL_CYCLE = 250; // milliseconds

const TravelWithCourseMonitorSection = () => {
  const [elapsedTime, setElapsedTime] = useState(0); // milliseconds. 산행 시간
  const appState = useRef(AppState.currentState);
  const {
    distance,
    travelState,
    getElapsedTime,
    remainTimeToEnd,
    remainTimeToStopover,
  } = useTravelStateStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startTimer = () => {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setElapsedTime(getElapsedTime());
        }, INTERVAL_CYCLE);
      }
    };
    const stopTimer = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
      if (nextAppState === "active") {
        startTimer();
      } else {
        stopTimer();
      }
    });

    if (appState.current === "active") {
      startTimer();
    }

    return () => {
      stopTimer();
      subscription.remove();
    };
  }, []);

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
          <MetricData disabled={!remainTimeToStopover}>
            <MetricValue>
              {remainTimeToStopover === null
                ? "--:--"
                : msToTimeText(remainTimeToStopover)
                    .split(":")
                    .slice(1)
                    .join(":")}
            </MetricValue>
            <MetricUnit>경유지까지</MetricUnit>
          </MetricData>
        </MetricItem>

        <Divider />
        <MetricItem>
          <MetricIcon>⛰️</MetricIcon>
          <MetricData>
            <MetricValue disabled={!remainTimeToEnd}>
              {remainTimeToEnd === null
                ? "--:--"
                : msToTimeText(remainTimeToEnd).split(":").slice(1).join(":")}
            </MetricValue>
            <MetricUnit>도착지까지</MetricUnit>
          </MetricData>
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
  background-color: ${COLORS.green500};
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

const MetricData = styled.View<{ disabled?: boolean }>`
  align-items: flex-start;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  color: ${({ disabled }) => (disabled ? COLORS["black-800"] : COLORS.black)};
`;

const MetricValue = styled.Text<{ disabled?: boolean }>`
  font-weight: 600;
  font-size: 16px;
  color: ${({ disabled }) => (disabled ? COLORS["black-800"] : COLORS.black)};
`;

const MetricUnit = styled.Text`
  font-size: 12px;
  color: ${COLORS["black-800"]};
  font-weight: 400;
  font-size: 11px;
  text-align: right;
`;

const Divider = styled.View`
  height: 40px;
  width: 1px;
  background-color: ${COLORS.gray900};
  opacity: 0.5;
`;

export default TravelWithCourseMonitorSection;
