/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Markers } from "@shared/types/map";
import { updateSearchParams } from "@shared/utils/url";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

interface UseDrawMarkersProps {
  map: any;
  markers: Markers[];
  enable?: boolean;
}

//TODO: 그리는 로직만 두고, 도메인과 관련한 로직은 분리하기
const useDrawMarkers = ({ map, markers, enable }: UseDrawMarkersProps) => {
  const router = useRouter(); //event listener를 위한 코드

  const drawnMarkersRef = useRef<naver.maps.Marker[]>([]);
  const markerLabelsRef = useRef<naver.maps.Marker[]>([]);
  const eventListenersRef = useRef<naver.maps.MapEventListener[]>([]);

  const getIconUrl = useCallback(
    (type: Markers["type"]) =>
      type === "BASE"
        ? "/icons/Base.svg"
        : type === "EMERGENCY_KIT"
          ? "/icons/Emergency_Kit.svg"
          : type === "MARKET"
            ? "/icons/Market.svg"
            : type === "RENTAL"
              ? "/icons/Rental.svg"
              : type === "TOILET"
                ? "/icons/Toilet.svg"
                : "/icons/Base.svg",
    [],
  );

  useEffect(() => {
    if (!map || !markers || markers.length === 0 || !enable) return;

    markers.forEach(({ id, coordinate, name, type }) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(coordinate[1], coordinate[0]),
        map: null,
        title: name,
        icon: {
          url: getIconUrl(type),
          size: new naver.maps.Size(30, 30),
          anchor: new naver.maps.Point(15, 15),
        },
        zIndex: type === "BASE" ? 1000 : 1,
      });
      drawnMarkersRef.current.push(marker);

      if (type === "BASE") {
        const listener = naver.maps.Event.addListener(marker, "click", () => {
          router.replace(
            updateSearchParams({
              searchParamName: "baseId",
              paramValue: `${id}`,
            }),
          );
        });
        eventListenersRef.current.push(listener);
      }

      if (type !== "TOILET" && type !== "EMERGENCY_KIT") {
        const markerLabel = new naver.maps.Marker({
          position: new naver.maps.LatLng(coordinate[1], coordinate[0]),
          map: null,
          title: name,
          icon: {
            content: `<div class="h-full flex items-center max-w-[30px]">
            <button class="bg-white border border-primary rounded-full py-0.5 px-2 text-xs font-semibold text-primary translate-x-16 pointer-events-none shrink-0">${name}</button>
            </div>`,
            size: new naver.maps.Size(130, 30),
            anchor: new naver.maps.Point(50, 15),
          },
        });
        markerLabelsRef.current.push(markerLabel);
      }
    });

    // 생성 후 즉시 줌 조건 적용
    const currentZoom = map.getZoom();
    if (currentZoom > 11) {
      drawnMarkersRef.current.forEach((marker) => {
        marker.setMap(map);
      });
    }
    if (currentZoom > 13) {
      markerLabelsRef.current.forEach((label) => {
        label.setMap(map);
      });
    }

    return () => {
      eventListenersRef.current.forEach((listener) => {
        naver.maps.Event.removeListener(listener);
      });
      drawnMarkersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
      markerLabelsRef.current.forEach((label) => {
        label.setMap(null);
      });
      // 배열 초기화
      drawnMarkersRef.current = [];
      markerLabelsRef.current = [];
      eventListenersRef.current = [];
    };
  }, [enable, getIconUrl, map, markers, router]);

  useEffect(() => {
    if (!map || !markers || markers.length === 0 || !enable) return;

    const zoomListener = naver.maps.Event.addListener(
      map,
      "zoom_changed",
      () => {
        const currentZoom = map.getZoom();

        if (currentZoom <= 11) {
          drawnMarkersRef.current.forEach((m) => m.setMap(null));
          markerLabelsRef.current.forEach((l) => l.setMap(null));
          return;
        }

        if (currentZoom <= 13) {
          drawnMarkersRef.current.forEach((marker) => {
            marker.setMap(map);
          });
          markerLabelsRef.current.forEach((label) => {
            label.setMap(null);
          });
          return;
        }

        drawnMarkersRef.current.forEach((marker) => {
          marker.setMap(map);
        });
        markerLabelsRef.current.forEach((label) => {
          label.setMap(map);
        });
      },
    );

    return () => {
      naver.maps.Event.removeListener(zoomListener);
    };
  }, [enable, map, markers]);
};

export default useDrawMarkers;
