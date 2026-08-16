/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

interface UseSetCurrentPositionMarkerProps {
  map: any;
  position: {
    latitude: number;
    longitude: number;
  };
  enable?: boolean;
}

// 현재 위치 마커 디자인 (renewal-s1.pen의 My Location)
// 헤일로 + 파란 점 — 앵커는 점의 중심
const createCurrentPositionContent = () => `
  <div class="relative h-0 w-0">
    <div class="absolute left-0 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F80ED]/15"></div>
    <div class="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#2F80ED] shadow-[0_2px_6px_rgba(27,58,42,0.25)]"></div>
  </div>`;

const useSetCurrentPositionMarker = ({
  map,
  position: { latitude, longitude },
  enable = true,
}: UseSetCurrentPositionMarkerProps) => {
  const markerRef = useRef<naver.maps.Marker | null>(null);

  useEffect(() => {
    if (!map || !enable) {
      markerRef.current?.setMap(null);
      markerRef.current = null;
      return;
    }

    const position = new naver.maps.LatLng(latitude, longitude);

    // 위치 갱신 주기가 짧아도 마커를 다시 만들지 않고 위치만 옮긴다
    if (markerRef.current) {
      markerRef.current.setPosition(position);
      return;
    }

    markerRef.current = new naver.maps.Marker({
      map,
      position,
      icon: {
        content: createCurrentPositionContent(),
        anchor: new naver.maps.Point(0, 0),
      },
      zIndex: 1100,
    });
  }, [map, latitude, longitude, enable]);

  useEffect(() => {
    return () => {
      markerRef.current?.setMap(null);
      markerRef.current = null;
    };
  }, []);
};

export default useSetCurrentPositionMarker;
