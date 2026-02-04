import styled from "@emotion/native";
import { BackArrow, ShareSVG } from "@shared/ui/Icons";
import { COLORS } from "@styles/colorPalette";
import { router } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity } from "react-native";

const TravelResultScreenHeaderSection = () => {
  const handleBackPress = useCallback(() => {
    router.replace("/(tabs)/home");
  }, []);

  const handleSharePress = useCallback(() => {
    // TODO: 공유 기능 구현
  }, []);

  return (
    <HeaderContainer>
      <TouchableOpacity onPress={handleBackPress}>
        <BackArrow width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSharePress}>
        <ShareSVG width={27} height={27} />
      </TouchableOpacity>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  z-index: 20;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background-color: ${COLORS.mainWhite};
  padding-top: 12px;
  padding-bottom: 12px;
`;

export default TravelResultScreenHeaderSection;
