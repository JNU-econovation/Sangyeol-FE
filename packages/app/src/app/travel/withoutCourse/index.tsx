import styled from "@emotion/native";
import useTravelWithoutCourse from "@hooks/feature/travel/useTravelWithoutCourse";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import { router } from "expo-router";
import { useEffect, useState } from "react";

//TODO: prerendering 관련 로직을 따로 분리

const DEFAULT_COUNT = 3;

/**
 * 해당 스크린은 홈 화면에서 탐험 시작버튼을 눌렀을 때 보여지는 스크린입니다.
 * 탐험을 시작하기 전 3초간 카운트다운을 보여주고, 그 후에 여행 웹뷰를 보여줍니다.
 * 카운트다운이 끝나면 여행 웹뷰가 활성화되고, 사용자는 여행을 시작할 수 있습니다.
 *
 * 코스를 지정하지 않고 탐험을 하는 화면
 */

const TravelScreen = () => {
  const [count, setCount] = useState(DEFAULT_COUNT); // 카운트다운에서 사용하는 수
  const { travelState, travelType, travelData } = useTravelStateStore();

  const { connect } = useTravelWithoutCourse();

  // 여행 시작 시 소켓 연결
  useEffect(() => {
    router.prefetch("/travel/withoutCourse/withoutCourseTravel");
    connect();
  }, []);

  useEffect(() => {
    // 이미 여행이 시작된 상태라면, 경고를 띄우고 기본 코스 ID로 이동 (여행은 여행 시작되지 않은 상태(idle)에서만 시작 가능)
    if (travelState !== "idle") {
      console.warn("[TravelScreen] 여행이 이미 시작되었습니다.");

      if (
        travelType !== "without-course" &&
        travelData.courseId &&
        travelData.mountainId
      ) {
        console.warn(
          "[TravelScreen] 현재 여행 타입이 'without-course'가 아닙니다. 기본 코스 ID로 이동합니다.",
        );

        const { courseId, mountainId } = travelData;

        router.replace(`/travel/${mountainId}/${courseId}/travel`);
        return;
      }

      router.replace("/travel/withoutCourse/withoutCourseTravel"); // 기본 코스 ID로 이동
      return;
    }

    // 카운트다운 시작
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    // 카운트다운이 끝난 후 여행 시작 화면으로 이동
    const timeout = setTimeout(() => {
      setCount(0);
      router.replace("/travel/withoutCourse/withoutCourseTravel");
    }, DEFAULT_COUNT * 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Screen count={count}>
      <Container>
        <CounterContainer count={count}>
          <Spacing size={50} />
          <Text color="mainWhite" fontSize={96} fontWeight="bold" italic>
            {count}
          </Text>
          <Spacing size={50} />
          <Text color="mainWhite" fontSize={20} fontWeight="bold">
            무리하지 말고,
          </Text>
          <Spacing size={10} />
          <Text color="mainWhite" fontSize={20} fontWeight="bold">
            자신의 페이스를 지키세요.
          </Text>
        </CounterContainer>
      </Container>
    </Screen>
  );
};

const Screen = styled.SafeAreaView<{ count: number }>`
  flex: 1;
  background-color: ${({ count }) =>
    count === 0 ? COLORS.mainWhite : COLORS.green800};
`;

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const CounterContainer = styled.View<{ count: number }>`
  height: ${({ count }) => (count === 0 ? "0" : "100%")};
  background-color: ${COLORS.green800};
  overflow: hidden;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ count }) => (count !== 0 ? "10" : "-10")};
  transition: all 3s ease-in-out;
  width: 100%;
  /* opacity: ${({ count }) => (count === 0 ? "0" : "1")}; */
`;

export default TravelScreen;
