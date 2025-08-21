import { COLORS } from "@styles/colorPalette";
import Spacing from "@components/common/shared/layout/Spacing";
import Text from "@components/common/shared/ui/Text";
import styled from "@emotion/native";
import { router } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";

const HomeNavGridSection = () => {
  const goCourse = useCallback(() => {
    router.push("/(tabs)/home/course");
  }, []);
  const goTravel = useCallback(() => {
    router.push("/travel/withoutCourse");
  }, []);
  const goReport = useCallback(() => {
    router.push("/report");
  }, []);
  const goManual = useCallback(() => {
    router.push("/(tabs)/home/safeManual");
  }, []);

  return (
    <Container>
      <ButtonContainer>
        <HomeLinkButton activeOpacity={0.8} onPress={goCourse}>
          <Text fontSize={20} fontWeight="semibold">
            코스 탐색
          </Text>
          <View>
            <Text fontSize={12} fontWeight="semibold">
              내비게이션 및
            </Text>
            <Text fontSize={12} fontWeight="semibold">
              코스 기록
            </Text>
          </View>
        </HomeLinkButton>

        <HomeLinkButton activeOpacity={0.8} onPress={goTravel}>
          <Text fontSize={20} fontWeight="semibold">
            산행 시작
          </Text>
          <Text fontSize={12} fontWeight="semibold">
            운동 기록하기
          </Text>
        </HomeLinkButton>
      </ButtonContainer>

      <Spacing size={10} />

      <ButtonContainer>
        <HomeLinkButton activeOpacity={0.8} onPress={goReport}>
          <Text fontSize={20} fontWeight="semibold">
            신고하기
          </Text>
          <Text fontSize={12} fontWeight="semibold">
            구조대 신고
          </Text>
        </HomeLinkButton>

        <HomeLinkButton activeOpacity={0.8} onPress={goManual}>
          <Text fontSize={20} fontWeight="semibold">
            안전 매뉴얼
          </Text>
          <View>
            <Text fontSize={12} fontWeight="semibold">
              사고발생시
            </Text>
            <Text fontSize={12} fontWeight="semibold">
              대처방법
            </Text>
          </View>
        </HomeLinkButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View``;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const HomeLinkButton = styled.TouchableOpacity`
  flex: 1;
  height: 100px;
  background-color: ${COLORS.mainWhite};
  border-radius: 10px;
  padding: 16px;
  justify-content: space-between;
`;

export default HomeNavGridSection;
