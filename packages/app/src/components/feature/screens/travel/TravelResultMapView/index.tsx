import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import ConfigurableMapView from "@widget/ConfigurableMapView";
import { memo, useEffect, useMemo } from "react";
import styled from "@emotion/native";
import Text from "@shared/ui/Text";
import { useReverseGeocode } from "@hooks/common/useReverseGeocode";

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

  const midPoint = useMemo(() => {
    if (traveledPath.length === 0) return { latitude: 0, longitude: 0 };

    const latitudes = traveledPath.map(([, latitude]) => latitude);
    const longitudes = traveledPath.map(([longitude]) => longitude);

    const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
    const centerLng = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

    return {
      latitude: centerLat,
      longitude: centerLng,
    };
  }, [traveledPath]);

  const zoomLevel = useMemo(() => {
    if (traveledPath.length === 0) return 15;

    const latitudes = traveledPath.map(([, latitude]) => latitude);
    const longitudes = traveledPath.map(([longitude]) => longitude);

    const latitudeDiff = Math.max(...latitudes) - Math.min(...latitudes);
    const longitudeDiff = Math.max(...longitudes) - Math.min(...longitudes);

    const paddedLatDiff = latitudeDiff * 25001; // 세로 패딩
    const paddedLngDiff = longitudeDiff * 25001; // 가로 패딩

    const latZoom = Math.max(1, 22 - Math.log2(paddedLatDiff));
    const lngZoom = Math.max(1, 22 - Math.log2(paddedLngDiff));

    const zoom = Math.min(latZoom, lngZoom);

    return Math.min(20, Math.max(1, zoom));
  }, [traveledPath]);

  // 중간 지점의 주소를 역지오코딩으로 가져오기
  const { address, isLoading: isAddressLoading } = useReverseGeocode(
    traveledPath.length > 0 ? midPoint : null,
  );

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Container>
      <TextContainer>
        <Text fontSize={12} fontWeight="medium" color="black">
          {isAddressLoading ? "위치 확인 중..." : address || "위치 정보 없음"}
        </Text>
      </TextContainer>
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
          logoAlign: "BottomRight",
        }}
        basePoints={basePoints}
      />
    </Container>
  );
});

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const TextContainer = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: ${COLORS.mainWhite};
  z-index: 10;
  padding: 6px 12px;
  border-radius: 4px;
`;

export default TravelResultMapView;
