import { useMemo } from "react";

interface CameraPosition {
  latitude: number;
  longitude: number;
  zoom: number;
}

/**
 * 경로 배열을 기반으로 전체 경로를 볼 수 있는 카메라 위치와 줌 레벨을 계산합니다.
 * 모바일 앱의 TravelResultMapView 로직을 따릅니다.
 *
 * @param traveledPath - [longitude, latitude] 형식의 좌표 배열
 * @returns 카메라 중심점(latitude, longitude)과 줌 레벨
 */
const useCalculateCameraPosition = (traveledPath: [number, number][]) => {
  const cameraPosition: CameraPosition = useMemo(() => {
    // 경로가 없는 경우
    if (traveledPath.length === 0) {
      return { latitude: 0, longitude: 0, zoom: 15 };
    }

    // 경도와 위도 범위 계산
    const latitudes = traveledPath.map(([, latitude]) => latitude);
    const longitudes = traveledPath.map(([longitude]) => longitude);

    const maxLat = Math.max(...latitudes);
    const minLat = Math.min(...latitudes);
    const maxLng = Math.max(...longitudes);
    const minLng = Math.min(...longitudes);

    // 중심점 계산
    const centerLat = (maxLat + minLat) / 2;
    const centerLng = (maxLng + minLng) / 2;

    // 위도 범위
    const latRange = maxLat - minLat;

    // 하단 UI(바텀시트) 회피를 위한 오프셋 (모바일: 40%)
    const offsetFactor = 0.4;
    const latOffset = latRange * offsetFactor;

    // 줌 레벨 계산
    const latitudeDiff = latRange;
    const longitudeDiff = maxLng - minLng;

    // 패딩을 고려한 범위
    const paddedLatDiff = latitudeDiff * 25001;
    const paddedLngDiff = longitudeDiff * 25001;

    // 로그 기반 줌 계산
    const latZoom = Math.max(1, 22 - Math.log2(paddedLatDiff));
    const lngZoom = Math.max(1, 22 - Math.log2(paddedLngDiff));

    const zoom = Math.min(latZoom, lngZoom);
    const finalZoom = Math.min(20, Math.max(1, zoom));

    return {
      latitude: centerLat - latOffset,
      longitude: centerLng,
      zoom: finalZoom,
    };
  }, [traveledPath]);

  return cameraPosition;
};

export default useCalculateCameraPosition;
