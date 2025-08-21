import styled from "@emotion/native";
import HomeCanvas from "@screens/Home/HomeCanvas";
import HomeHeaderSection from "@screens/Home/HomeHeaderSection";
import HomeNavGridSection from "@screens/Home/HomeNavGridSection";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";

const HomeScreen = () => {
  return (
    <ScreenContainer backgroundColor="subGray">
      <Container>
        <Spacing size={20} />
        <HomeHeaderSection />
        <Spacing size={20} />
        <HomeCanvas />
        <HomeNavGridSection />
        <Spacing size={20} />
      </Container>
    </ScreenContainer>
  );
};
const Container = styled.View`
  flex: 1;
  padding-inline: 20px;
`;

export default HomeScreen;
