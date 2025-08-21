import { COLORS } from "@styles/colorPalette";
import styled from "@emotion/native";
import ExplainCarousel from "@screens/Starter/ExplainCarousel";
import LoginButton from "@screens/Starter/LoginButton";

const StarterScreen = () => {
  return (
    <Container>
      <ExplainCarousel />
      <LoginButton />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${COLORS.mainWhite};
`;

export default StarterScreen;
