import styled from "@emotion/native";
import { Image } from "expo-image";

import { COLOR_PALETTE } from "@shared/constants/colors";

import GradientBackground from "./components/GradientBackground";
import MountainBackdrop from "./components/MountainBackdrop";

const SplashSection = () => {
  return (
    <Container>
      <GradientBackground />
      <MountainBackdrop />
      <BrandArea>
        <Logo
          source={require("@assets/images/splash-logo.png")}
          contentFit="contain"
        />
        <Tagline>산행할 때, 산결 하나로</Tagline>
      </BrandArea>
    </Container>
  );
};

export default SplashSection;

const Container = styled.View`
  flex: 1;
  background-color: ${COLOR_PALETTE.surface};
`;

/* 디자인 기준(375x812)에서 브랜드 영역이 y=300에 위치 → 300/812 ≈ 37% */
const BrandArea = styled.View`
  position: absolute;
  top: 37%;
  left: 0;
  right: 0;
  align-items: center;
  gap: 12px;
`;

const Logo = styled(Image)`
  width: 130px;
  height: 118px;
`;

const Tagline = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_PALETTE.muted};
`;
