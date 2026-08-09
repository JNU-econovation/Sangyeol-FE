/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * infoWindow : 지도에 표시되는 정보창
 */

import { useCallback, useEffect, useId, useState } from "react";

const DEFAULT_MAP_ZOOM = 18;

const ACCESS_KEY = process.env.NEXT_PUBLIC_NAVER_KEY;

const loadScript = (src: string, callback: () => void) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.onload = () => callback();
  document.head.appendChild(script);
};

interface NaverMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

/**
 *
 * 네이버 맵을 사용하기 위해서는 우선적으로 훅을 실행하여야합니다.
 * 이 훅은 네이버 맵을 초기화하고, 맵 객체를 반환합니다.
 * 리턴값으로 mapId를 사용하여 맵을 렌더링할 div의 id를 설정해야합니다.
 * 리턴값 map을 다른 훅의 첫 인자로 넘겨주어야합니다.
 */
const useNaverMap = ({
  latitude,
  longitude,
  zoom = DEFAULT_MAP_ZOOM,
}: NaverMapProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [map, setMap] = useState<any>(null);
  const mapId = useId();

  const initMap = useCallback(
    (lat: number, lng: number) => {
      const mapOptions = {
        center: new naver.maps.LatLng(lat, lng),
        logoControl: false,
        logoControlOptions: {
          position: naver.maps.Position.RIGHT_TOP,
        },
        scaleControl: false,
        scaleControlOptions: {
          position: naver.maps.Position.BOTTOM_LEFT,
        },
        mapDataControl: false,
        mapDataControlOptions: {
          position: naver.maps.Position.BOTTOM_LEFT,
        },
        zoom,
      };

      setMap(new naver.maps.Map(mapId, mapOptions));
      setIsLoading(false);
    },
    [mapId, zoom]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadScript(
        `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${ACCESS_KEY}`,
        () => initMap(latitude, longitude)
      );
      return;
    }
    initMap(latitude, longitude);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  return {
    isLoading,
    map,
    mapId,
    initMap,
  };
};

export default useNaverMap;
