import styled from "@emotion/native";
import { COLORS } from "@styles/colorPalette";
import { TouchableOpacity } from "react-native";

const TravelNavIcon = () => {
  const routeToReport = () => {};
  const routeToManual = () => {};

  return (
    <Container>
      <Background />
      <IconContainer>
        <TouchableOpacity activeOpacity={0.6} onPress={routeToReport}>
          <Icon source={require("@assets/images/Report.png")} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={routeToManual}>
          <Icon source={require("@assets/images/Manual.png")} />
        </TouchableOpacity>
      </IconContainer>
    </Container>
  );
};

const Container = styled.View`
  position: absolute;
  top: 126px;
  right: 26px;
  z-index: 10;
  justify-content: center;
  border-radius: 50px;
`;

const Background = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  opacity: 0.8;
  border-radius: 50px;
  background-color: ${COLORS.mainWhite};
`;

const IconContainer = styled.View`
  padding-block: 16px;
  padding-inline: 12px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Icon = styled.Image`
  width: 32px;
  height: 32px;
`;

export default TravelNavIcon;
