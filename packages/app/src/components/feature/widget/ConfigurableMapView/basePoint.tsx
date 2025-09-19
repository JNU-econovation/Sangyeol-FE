import { NaverMapCircleOverlay } from "@mj-studio/react-native-naver-map";
import { COLORS } from "@styles/colorPalette";
import { getScaledRadius } from "@utils/map";
import { Fragment } from "react";

interface BasePointProps {
  coordinates: { latitude: number; longitude: number }[];
  zoomLevel: number; // 줌 레벨 (기본값: 14)
}

const BasePoint = ({ coordinates, zoomLevel }: BasePointProps) => {
  return (
    <>
      {coordinates.map((coord, index) => (
        <Fragment key={`${index}-${coord.latitude}-${coord.longitude}`}>
          <NaverMapCircleOverlay
            latitude={coord.latitude}
            longitude={coord.longitude}
            radius={getScaledRadius(12, zoomLevel)}
            color={COLORS.primary}
            zIndex={1}
            globalZIndex={1}
          />
          <NaverMapCircleOverlay
            latitude={coord.latitude}
            longitude={coord.longitude}
            radius={getScaledRadius(8, zoomLevel)}
            color={COLORS.mainWhite}
            zIndex={2}
            globalZIndex={2}
          />
        </Fragment>
      ))}
    </>
  );
};

export default BasePoint;
