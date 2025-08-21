import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import { HikingSVG, BackArrow, StarSVG } from "@shared/ui/Icons";
import Text from "@shared/ui/Text";
import AppleLoginButton from "@widget/AppleLoginButton";
import KakaoLoginButton from "@widget/KakaoLoginButton";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

const LoginScreen = () => {
  return (
    <Container>
      <Spacing size={28} />
      <HeaderContainer>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
          <BackArrow />
        </TouchableOpacity>
      </HeaderContainer>

      <Spacing size={24} />

      <TitleContainer>
        <Text fontSize={30} fontWeight="bold" color="mainGreen">
          그럼,
        </Text>
        <Text fontSize={30} fontWeight="bold" color="mainGreen">
          모험을 시작해볼까요?
        </Text>
        <TitleStarPositioner>
          <StarSVG />
        </TitleStarPositioner>
      </TitleContainer>

      <Spacing size={68} />
      <HikingSVG />
      <Spacing size={68} />

      <KakaoLoginButton />

      <Spacing size={14} />
      <AppleLoginButton />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding-inline: 25px;
  padding-block: 40px;
  align-items: center;
`;

const TitleContainer = styled.View`
  position: relative;
  width: 100%;
`;

const TitleStarPositioner = styled.View`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0px, -12px);
`;

const HeaderContainer = styled.View`
  width: 100%;
`;

export default LoginScreen;
