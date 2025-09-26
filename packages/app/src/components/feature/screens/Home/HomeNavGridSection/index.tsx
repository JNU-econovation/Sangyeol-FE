import styled from "@emotion/native";
import useReportAlertModal from "@hooks/feature/modal/useReportAlertModal";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import useSetModalAlertStore from "@store/asyncStorage/useSetModalAlertStore";
import { COLORS } from "@styles/colorPalette";
import { router } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";

const HomeNavGridSection = () => {
  const { isReportAlertVisible, hydrated } = useSetModalAlertStore();
  const { showReportAlert } = useReportAlertModal();

  const goCourse = useCallback(() => {
    router.push("/(tabs)/home/course");
  }, []);

  const goTravel = useCallback(() => {
    router.push("/travel/withoutCourse");
  }, []);

  const goReport = useCallback(() => {
    if (!hydrated) return;
    if (isReportAlertVisible) return showReportAlert();
    router.push("/report");
  }, [isReportAlertVisible, showReportAlert]);

  const goManual = useCallback(() => {
    router.push("/(tabs)/home/safeManual");
  }, []);

  return (
    <Container>
      <ButtonContainer>
        <HomeLinkButton activeOpacity={0.8} onPress={goCourse}>
          <Text fontSize={20} fontWeight="semibold" color="primary">
            코스검색
          </Text>
          <View>
            <Text fontSize={12} fontWeight="semibold" color="gray800">
              내비게이션 및
            </Text>
            <Text fontSize={12} fontWeight="semibold" color="gray800">
              코스 기록
            </Text>
          </View>
        </HomeLinkButton>

        <HomeLinkButton activeOpacity={0.8} onPress={goTravel}>
          <Text fontSize={20} fontWeight="semibold" color="primary">
            산행시작
          </Text>
          <Text fontSize={12} fontWeight="semibold" color="gray800">
            운동 기록하기
          </Text>
        </HomeLinkButton>
      </ButtonContainer>

      <Spacing size={10} />

      <ButtonContainer>
        <HomeLinkButton activeOpacity={0.8} onPress={goReport}>
          <Text fontSize={20} fontWeight="semibold" color="yellow">
            신고하기
          </Text>
          <Text fontSize={12} fontWeight="semibold" color="gray800">
            구조대 신고
          </Text>
        </HomeLinkButton>

        <HomeLinkButton activeOpacity={0.8} onPress={goManual}>
          <Text fontSize={20} fontWeight="semibold" color="primary">
            안전 매뉴얼
          </Text>
          <View>
            <Text fontSize={12} fontWeight="semibold" color="gray800">
              사고발생시
            </Text>
            <Text fontSize={12} fontWeight="semibold" color="gray800">
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
