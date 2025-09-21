import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import ConfigurableMapView from "@widget/ConfigurableMapView";
import { memo, useEffect, useMemo } from "react";

const ZOOM_LEVEL = 14;

const TravelResultMapView = memo(() => {
  const { traveledPath, reset } = useTravelStateStore();

  const traveledPaths = traveledPath.map(([longitude, latitude]) => ({
    latitude,
    longitude,
  }));
  const basePoints = useMemo(() => {
    return traveledPaths.length >= 2
      ? [traveledPaths[0], traveledPaths[traveledPaths.length - 1]]
      : traveledPaths.length === 1
        ? [traveledPaths[0]]
        : [];
  }, [traveledPaths]);

  const midPoint = {
    latitude:
      traveledPath.length > 0
        ? traveledPath.reduce((acc, cur) => acc + Number(cur[1]), 0) /
          traveledPath.length
        : 0,
    longitude:
      traveledPath.length > 0
        ? traveledPath.reduce((acc, cur) => acc + Number(cur[0]), 0) /
          traveledPath.length
        : 0,
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <ConfigurableMapView
      paths={[
        {
          coords: traveledPaths,
          color: COLORS.primary,
          width: 6,
        },
      ]}
      currentPositionIcon={false}
      options={{
        initialCamera: {
          latitude: midPoint.latitude,
          longitude: midPoint.longitude,
          zoom: ZOOM_LEVEL,
        },
        maxZoom: ZOOM_LEVEL + 0.01,
        minZoom: ZOOM_LEVEL - 0.01,
        isRotateGesturesEnabled: false, // 회전 제스처 비활성화
        isTiltGesturesEnabled: false, // 기울기 제스처 비활성화
        isScrollGesturesEnabled: false, // 스크롤 제스처 비활성화
        isZoomGesturesEnabled: false, // 줌 제스처 비활성화
        isLiteModeEnabled: true, // 라이트 모드 활성화 (성능 향상)
      }}
      basePoints={basePoints}
    />
  );
});

export default TravelResultMapView;
