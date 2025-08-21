import styled from "@emotion/native";
import OnboardFormSection from "@screens/onboarding/OnboardFormSection";
import Spacing from "@shared/layout/Spacing";
import Header from "@shared/ui/Header";
import Text from "@shared/ui/Text";

const EmailOnboardingScreen = () => {
  return (
    <Screen>
      <Spacing size={80} />
      <Header />
      <Spacing size={30} />
      <Container>
        <Text fontWeight="semibold" color="mainGreen" fontSize={24}>
          메일 인증
        </Text>
        <Spacing size={40} />
        <OnboardFormSection />
      </Container>
    </Screen>
  );
};

const Screen = styled.View`
  flex: 1;
  position: relative;
`;

const Container = styled.View`
  flex: 1;
  padding-inline: 24px;
`;

export default EmailOnboardingScreen;
