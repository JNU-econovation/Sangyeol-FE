import styled from "@emotion/native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

import { COLOR_PALETTE } from "@shared/constants/colors";

const GradientBackground = () => {
  return (
    <FullscreenSvg>
      <Defs>
        <LinearGradient id="splash-background" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={COLOR_PALETTE.primarySoft} />
          <Stop offset="1" stopColor={COLOR_PALETTE.surface} />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#splash-background)" />
    </FullscreenSvg>
  );
};

export default GradientBackground;

const FullscreenSvg = styled(Svg)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
