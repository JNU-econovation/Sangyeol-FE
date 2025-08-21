import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import { router, useLocalSearchParams } from "expo-router";
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
  const [count, setCount] = useState(DEFAULT_COUNT);
  const { travelState } = useTravelStateStore();
  const { courseId } = useLocalSearchParams<{ courseId: string }>();

  useEffect(() => {
    if (travelState !== "idle") {
      console.warn("[TravelScreen] 여행이 이미 시작되었습니다.");
      router.replace(`/travel/${courseId}/travel`);
      return;
    }

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

    const timeout = setTimeout(() => {
      setCount(0);
      router.replace(`/travel/${courseId}/travel`);
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
    count === 0 ? COLORS.mainWhite : COLORS.mainGreen};
`;

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const CounterContainer = styled.View<{ count: number }>`
  height: ${({ count }) => (count === 0 ? "0" : "100%")};
  background-color: ${COLORS.mainGreen};
  overflow: hidden;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ count }) => (count !== 0 ? 10 : -10)};
  transition: all 3s ease-in-out;
  width: 100%;
`;

const WebviewContainer = styled.View<{ count: number }>`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ count }) => (count === 0 ? 100 : -10)};
  transition: all 3s ease-in-out;
  background-color: ${COLORS.mainRed};
`;

export default TravelScreen;
