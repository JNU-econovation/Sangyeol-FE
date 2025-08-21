import styled from "@emotion/native";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";
import Header from "@shared/ui/Header";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { router } from "expo-router";
import { useCallback } from "react";

const ReportScreen = () => {
  const handleGoToImmediatelyReport = useCallback(() => {
    router.push("/report/immediatelyReport");
  }, []);

  const handleGoToDetailReport = useCallback(() => {
    router.push("/report/detailReport");
  }, []);

  return (
    <ScreenContainer backgroundColor="mainGreen">
      <Spacing size={20} />
      <Header />

      <Spacing size={38} />
      <TextContainer>
        <Text color="mainWhite" fontWeight="bold" fontSize={28}>
          위급 상황인가요?
        </Text>
        <Spacing size={16} />
        <Text color="mainWhite" fontWeight="medium" fontSize={16}>
          아래 버튼을 누르면
        </Text>
        <Text color="mainWhite" fontWeight="medium" fontSize={16}>
          구조대에 신고할 수 있습니다.
        </Text>
      </TextContainer>

      <ImmediatelyReportLink
        activeOpacity={0.8}
        onPress={handleGoToImmediatelyReport}
      >
        <Text fontSize={48} color="mainRed" fontWeight="semibold">
          즉시
        </Text>
        <Text color="mainGreen" fontSize={36} fontWeight="semibold">
          신고하기
        </Text>
      </ImmediatelyReportLink>

      <Spacing size={26} />

      <DetailReportLink activeOpacity={0.8} onPress={handleGoToDetailReport}>
        <Text
          fontSize={48}
          color="mainGreen"
          fontWeight="semibold"
          textAlign="right"
        >
          상세
        </Text>
        <Text
          color="mainGreen"
          fontSize={36}
          fontWeight="semibold"
          textAlign="right"
        >
          신고하기
        </Text>
      </DetailReportLink>
      <Spacing size={35} />
    </ScreenContainer>
  );
};

const TextContainer = styled.View`
  display: flex;
  flex-grow: 1;
  padding-inline: 28px;
`;

const ImmediatelyReportLink = styled.TouchableOpacity`
  background-color: ${COLORS.mainWhite};
  padding-top: 28px;
  padding-inline: 28px;
  flex-grow: 1;
`;

const DetailReportLink = styled.TouchableOpacity`
  background-color: ${COLORS.mainWhite};
  padding-inline: 28px;
  padding-bottom: 28px;
  flex-grow: 1;
  justify-content: flex-end;
`;

export default ReportScreen;
