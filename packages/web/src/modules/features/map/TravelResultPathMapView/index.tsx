"use client";

import useCalculateCameraPosition from "@shared/hooks/domain/map/useCalculateCameraPosition";
import useNaverMap from "@shared/hooks/domain/map/useNaverMap";
import useDrawPath from "@shared/hooks/domain/map/useDrawPath";
import { useEffect, useMemo } from "react";

interface TravelResultPathMapViewProps {
  /**
   * [longitude, latitude] 형식의 좌표 배열
   */
  traveledPath: [number, number][];
}

/**
 * 산행 결과 화면용 지도 컴포넌트
 * - 전체 경로를 화면에 맞게 표시
 * - 사용자 상호작용(줌, 회전, 스크롤) 불가
 * - 하단 UI 영역을 피하도록 카메라 위치 조정
 */
export default function TravelResultPathMapView({
  traveledPath,
}: TravelResultPathMapViewProps) {
  const cameraPosition = useCalculateCameraPosition(traveledPath);

  const { map, mapId } = useNaverMap({
    latitude: cameraPosition.latitude,
    longitude: cameraPosition.longitude,
    zoom: cameraPosition.zoom,
  });

  // 시작점과 끝점 계산
  const basePoints = useMemo(() => {
    if (traveledPath.length >= 2) {
      return [
        { latitude: traveledPath[0][1], longitude: traveledPath[0][0] }, // 시작점
        {
          latitude: traveledPath[traveledPath.length - 1][1],
          longitude: traveledPath[traveledPath.length - 1][0],
        }, // 끝점
      ];
    } else if (traveledPath.length === 1) {
      return [{ latitude: traveledPath[0][1], longitude: traveledPath[0][0] }];
    }
    return [];
  }, [traveledPath]);

  // 경로를 폴리라인으로 표시
  const paths =
    traveledPath.length > 0
      ? [
          {
            path: traveledPath,
            strokeWeight: 6,
            strokeColor: "#2B7552",
            strokeOpacity: 1,
          },
        ]
      : [];

  useDrawPath({
    map,
    paths,
    enable: paths.length > 0,
  });

  // 시작점과 끝점에 원(마커) 그리기
  useEffect(() => {
    if (!map || basePoints.length === 0) return;

    basePoints.forEach((point) => {
      const center = new naver.maps.LatLng(point.latitude, point.longitude);

      // 바깥쪽 원 (primary 색상)
      new naver.maps.Circle({
        map,
        center,
        radius: 2,
        fillColor: "#2B7552",
        fillOpacity: 1,
        strokeColor: "transparent",
        strokeWeight: 0,
      });

      // 안쪽 원 (흰색)
      new naver.maps.Circle({
        map,
        center,
        radius: 1,
        fillColor: "#fff",
        fillOpacity: 1,
        strokeColor: "transparent",
        strokeWeight: 0,
      });
    });
  }, [map, basePoints]);

  // 모든 제스처 비활성화
  useEffect(() => {
    if (!map) return;

    // 네이버맵 제스처 비활성화
    map.setOptions({
      draggable: false,
      pinchZoom: false,
      scrollWheel: false,
      keyboardShortcuts: false,
    });
  }, [map]);

  return <div id={mapId} className="h-full w-full" />;
}
