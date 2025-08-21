"use client";

import useGetCurrentPosition from "@hooks/common/useGetCurrentPosition";
import type { PolylineOptions } from "@hooks/feature/map/useDrawPath";
import useDrawPath from "@hooks/feature/map/useDrawPath";
import useNaverMap from "@hooks/feature/map/useNaverMap";
import useSetCircle from "@hooks/feature/map/useSetCircle";
import useSetMarker from "@hooks/feature/map/useSetMarker";

interface MapViewProps {
  defaultCurrentPointPosition?: { latitude: number; longitude: number };
  paths?: PolylineOptions[];
  marker?: { latitude: number; longitude: number };
  // markers?: Markers[];
  currentPositionIcon?: boolean;
  zoom?: number;
  initPosition?: { latitude: number; longitude: number };
  children?: (props: { map: any }) => React.ReactNode;
  getCurrentPositionInterval?: number;
}
/**
 * 대부분의 맵 사용시 해당 컴포넌트를 사용하면 됩니다.
 * 해당 컴포넌트는 entity 컴포넌트이므로, 이를 확장하여 widget 컴포넌트를 만들어 사용하세요
 * 만약 map에 접근하는 다른 로직을 추가하고싶다면, FACC 패턴을 사용하여 map을 가져와 사용하세요
 */

export default function MapView({
  paths,
  defaultCurrentPointPosition,
  marker,
  currentPositionIcon = true, // 최근 위치를 점으로 보여준다
  zoom = 18,
  initPosition,
  children,
  getCurrentPositionInterval,
}: MapViewProps) {
  const { currentPosition } = useGetCurrentPosition({
    defaultCurrentPointPosition,
    interval: getCurrentPositionInterval,
  });

  const { mapId, map } = useNaverMap({
    latitude: initPosition?.latitude || currentPosition.latitude,
    longitude: initPosition?.longitude || currentPosition.longitude,
    zoom,
  });

  useDrawPath({
    map,
    paths: paths || [],
    enable: !!paths && paths.length > 0,
  });

  useSetCircle({
    map,
    position: currentPosition,
    zoom,
    enable: currentPositionIcon,
    option: {
      radius: zoom,
      fillColor: "#FF0000",
      fillOpacity: 0.3,
      strokeColor: "#FF0000",
    },
  });

  useSetMarker({
    map,
    position: currentPosition ?? defaultCurrentPointPosition,
    enable: marker !== undefined,
  });

  return (
    <div id={mapId} className="h-screen w-screen transform-gpu">
      {children && children({ map })}
    </div>
  );
}
