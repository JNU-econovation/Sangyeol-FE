import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import ConfigurableMapView from "@widget/ConfigurableMapView";
import { memo, useEffect, useMemo } from "react";

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
        ? (Math.max(...traveledPath.map(([, latitude]) => latitude)) +
            Math.min(...traveledPath.map(([, latitude]) => latitude))) /
          2
        : 0,
    longitude:
      traveledPath.length > 0
        ? (Math.max(...traveledPath.map(([longitude]) => longitude)) +
            Math.min(...traveledPath.map(([longitude]) => longitude))) /
          2
        : 0,
  };

  const zoomLevel = useMemo(() => {
    if (traveledPath.length === 0) return 15;

    const latitudes = traveledPath.map(([, latitude]) => latitude);
    const longitudes = traveledPath.map(([longitude]) => longitude);

    const latitudeDiff = Math.max(...latitudes) - Math.min(...latitudes);
    const longitudeDiff = Math.max(...longitudes) - Math.min(...longitudes);

    const paddedLatDiff = latitudeDiff * 1.15;
    const paddedLngDiff = longitudeDiff * 1.15;

    const maxDiff = Math.max(paddedLatDiff, paddedLngDiff);

    return Math.min(
      20,
      Math.max(13, Math.max(1, 24 - Math.log2(maxDiff * 111000))),
    );
  }, [traveledPath]);

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
          outlineWidth: 0,
        },
      ]}
      currentPositionIcon={false}
      options={{
        initialCamera: {
          latitude: midPoint.latitude,
          longitude: midPoint.longitude,
          zoom: zoomLevel,
        },
        maxZoom: zoomLevel + 0.01,
        minZoom: zoomLevel - 0.01,
        isRotateGesturesEnabled: false, // 회전 제스처 비활성화
        isTiltGesturesEnabled: false, // 기울기 제스처 비활성화
        isScrollGesturesEnabled: false, // 스크롤 제스처 비활성화
        isZoomGesturesEnabled: false, // 줌 제스처 비활성화
        isLiteModeEnabled: true, // 라이트 모드 활성화 (성능 향상)
        logoAlign: "BottomLeft",
        logoMargin: {
          bottom: 250,
        },
      }}
      basePoints={basePoints}
    />
  );
});

export default TravelResultMapView;
