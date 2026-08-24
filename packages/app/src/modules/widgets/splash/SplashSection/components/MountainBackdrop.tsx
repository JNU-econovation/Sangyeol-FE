import styled from "@emotion/native";
import Svg, { Path } from "react-native-svg";

import { COLOR_PALETTE } from "@shared/constants/colors";

interface MountainLayer {
  name: string;
  viewBoxHeight: number;
  geometry: string;
  fill: string;
  opacity: number;
}

const VIEW_BOX_WIDTH = 375;

const MOUNTAIN_LAYERS: MountainLayer[] = [
  {
    name: "back",
    viewBoxHeight: 342,
    geometry: "M0 342l0-192 60-55 60 45 55-70 65 60 60-45 75 45 0 212z",
    fill: COLOR_PALETTE.primaryAlt,
    opacity: 0.16,
  },
  {
    name: "front",
    viewBoxHeight: 252,
    geometry: "M0 252l0-132 55-60 55 50 55-70 65 55 60-40 50 35 35-20 0 182z",
    fill: COLOR_PALETTE.primary,
    opacity: 0.26,
  },
];

const MountainBackdrop = () => {
  return (
    <>
      {MOUNTAIN_LAYERS.map((layer) => (
        <MountainSvg
          key={layer.name}
          viewBox={`0 0 ${VIEW_BOX_WIDTH} ${layer.viewBoxHeight}`}
          preserveAspectRatio="none"
          style={{ aspectRatio: VIEW_BOX_WIDTH / layer.viewBoxHeight }}
        >
          <Path d={layer.geometry} fill={layer.fill} opacity={layer.opacity} />
        </MountainSvg>
      ))}
    </>
  );
};

export default MountainBackdrop;

const MountainSvg = styled(Svg)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
`;
