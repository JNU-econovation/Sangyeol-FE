import styled from "@emotion/native";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";
import { COLORS } from "@styles/colorPalette";

const ComingSoonScreen = () => {
  return (
    <ScreenContainer>
      <ContentContainer>
        <WarningImage source={require("@assets/images/Sangyeol_Warning.png")} />
        <Spacing size={26} />
        <ScreenHeader>
          <BoldText>서비스 준비중</BoldText>
          입니다.
        </ScreenHeader>
        <Spacing size={28} />
        <ScreenDescription>이용에 불편을 드려 죄송합니다.</ScreenDescription>
        <Spacing size={10} />
        <ScreenDescription>
          서비스 제공을 위해 기능 준비 중에 있습니다.
        </ScreenDescription>
        <Spacing size={10} />
        <ScreenDescription>
          빠른시일 내에 준비하여 찾아뵙겠습니다.
        </ScreenDescription>
      </ContentContainer>
    </ScreenContainer>
  );
};

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WarningImage = styled.Image`
  width: 125px;
  height: 112px;
`;

const ScreenHeader = styled.Text`
  font-size: 30px;
`;

const BoldText = styled.Text`
  font-weight: 900;
`;

const ScreenDescription = styled.Text`
  font-size: 16px;
  color: ${COLORS.gray900};
`;

export default ComingSoonScreen;
