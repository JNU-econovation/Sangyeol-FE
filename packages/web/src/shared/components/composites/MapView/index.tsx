"use client";

import useGetCurrentPosition from "@shared/hooks/common/useGetCurrentPosition";
import type { PolylineOptions } from "@shared/hooks/domain/map/useDrawPath";
import useDrawPath from "@shared/hooks/domain/map/useDrawPath";
import useNaverMap from "@shared/hooks/domain/map/useNaverMap";
import useSetCurrentPositionMarker from "@shared/hooks/domain/map/useSetCurrentPositionMarker";
import useSetMarker from "@shared/hooks/domain/map/useSetMarker";
import { useMemo } from "react";

// 경로 디자인 (renewal-s1.pen의 Route Layer) : 흰색 캐이싱 위에 초록 라인
const ROUTE_LINE_STYLE = {
  strokeColor: "#2B7552",
  strokeWeight: 5,
  strokeOpacity: 1,
  strokeLineCap: "round",
  strokeLineJoin: "round",
} satisfies Omit<PolylineOptions, "path">;

const ROUTE_CASING_STYLE = {
  strokeColor: "#FFFFFF",
  strokeOpacity: 1,
  strokeLineCap: "round",
  strokeLineJoin: "round",
} satisfies Omit<PolylineOptions, "path" | "strokeWeight">;

// 캐이싱은 라인보다 양쪽 2px씩 두껍다 (라인 5px + 4px = 9px)
const ROUTE_CASING_WEIGHT_OFFSET = 4;

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

  // 라인이 캐이싱 위에 그려지도록 캐이싱을 모두 먼저 그린다
  const styledPaths = useMemo<PolylineOptions[]>(() => {
    if (!paths) return [];

    const casings = paths.map(
      ({ path, strokeWeight = ROUTE_LINE_STYLE.strokeWeight }) => ({
        ...ROUTE_CASING_STYLE,
        path,
        strokeWeight: strokeWeight + ROUTE_CASING_WEIGHT_OFFSET,
      }),
    );
    const lines = paths.map((options) => ({
      ...ROUTE_LINE_STYLE,
      ...options,
    }));

    return [...casings, ...lines];
  }, [paths]);

  useDrawPath({
    map,
    paths: styledPaths,
    enable: styledPaths.length > 0,
  });

  useSetCurrentPositionMarker({
    map,
    position: currentPosition,
    enable: currentPositionIcon,
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
