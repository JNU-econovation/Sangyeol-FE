import styled from "@emotion/native";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";
import Header from "@shared/ui/Header";
import Text from "@shared/ui/Text";
import MessageReportButton from "@widget/MessageReportButton";
import { View } from "react-native";

const immediatelyReport = () => {
  return (
    <ScreenContainer>
      <Spacing size={20} />
      <Header headerTitle="즉시 신고하기" />
      <Spacing size={38} />

      <ContentContainer>
        <Text color="mainGreen" fontWeight="bold" fontSize={24}>
          현 위치 전송 안내
        </Text>
        <Spacing size={7} />
        <Text>현재 위치가 구조 요청 문자로 발송됩니다.</Text>
        <Spacing size={3} />
        <Text>수정 없이 그대로 전송해주세요.</Text>
      </ContentContainer>

      <Spacing size={20} />
      <MessageExampleContainer>
        <MessageExampleImage
          source={require("@assets/images/Message_Example.png")}
        />
      </MessageExampleContainer>

      <View style={{ paddingHorizontal: 28 }}>
        <MessageReportButton />
      </View>
      <Spacing size={38} />
    </ScreenContainer>
  );
};

const ContentContainer = styled.View`
  padding-inline: 28px;
`;

const MessageExampleContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const MessageExampleImage = styled.Image`
  width: 350px;
  height: 362px;
`;

export default immediatelyReport;
