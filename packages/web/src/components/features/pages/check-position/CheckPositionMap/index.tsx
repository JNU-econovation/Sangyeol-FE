"use client";

import useRouteBackBridge from "@hooks/feature/bridge/useRouteBackBridge";
import useSetReportPositionBridge from "@hooks/feature/bridge/useSetReportPositionBridge";
import useNaverMap from "@hooks/feature/map/useNaverMap";
import PositionBottom from "@shared/layout/PositionBottom/index";
import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import { Suspense } from "@suspensive/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import CheckPositionMapLoader from "./loader";

const DEFAULT_POSITION = { latitude: 35.122769, longitude: 126.996822 };

interface CheckPositionMapProps {
  defaultPosition?: { latitude: number; longitude: number };
  zoom?: number;
}

//TODO: 지도와 버튼/기능을 분리하기
export default Suspense.with(
  {
    fallback: <CheckPositionMapLoader />,
    clientOnly: true,
    name: "CheckPositionMap",
  },
  function CheckPositionMap({
    defaultPosition = DEFAULT_POSITION,
    zoom = 18,
  }: CheckPositionMapProps) {
    const searchParams = useSearchParams();
    const latitude = searchParams.get("lat");
    const longitude = searchParams.get("lng");

    const initialPosition = {
      latitude: latitude ? parseFloat(latitude) : defaultPosition.latitude,
      longitude: longitude ? parseFloat(longitude) : defaultPosition.longitude,
    };

    const goBack = useRouteBackBridge();
    const setReportPosition = useSetReportPositionBridge();
    // const getCurrentPosition = useGetCurrentPositionBridge();

    const { mapId, map } = useNaverMap({
      latitude: initialPosition.latitude,
      longitude: initialPosition.longitude,
      zoom,
    });

    useEffect(() => {
      if (!map) return;

      const listener = naver.maps.Event.addListener(map, "dragend", () => {
        const center = map.getCenter();
        const position = {
          latitude: center.lat(),
          longitude: center.lng(),
        };
        setReportPosition(position);
        // getCurrentPosition(position);
      });

      return () => {
        naver.maps.Event.removeListener(listener);
      };
    }, [map, setReportPosition]);

    const handleCurrentPositionClick = () => {
      // initialPosition로 이동
      // if (map) {
      //   map.setCenter(
      //     new naver.maps.LatLng(
      //       initialPosition.latitude,
      //       initialPosition.longitude
      //     )
      //   );
      //   setReportPosition(initialPosition);
      // }
      goBack();
    };

    return (
      <div className="relative h-screen w-screen">
        <div id={mapId} className="h-full w-full" />
        <div className="absolute left-1/2 top-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform pointer-events-none">
          <div className="h-full w-full rounded-full border-4 border-red-500 bg-red-500 shadow-lg">
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white"></div>
          </div>
        </div>
        <PositionBottom padding={6}>
          <Button fullWidth onClick={handleCurrentPositionClick}>
            현재 위치로 설정
          </Button>
          <Spacing size={4} />
          <Button
            fullWidth
            color={"white"}
            onClick={() => {
              // initialPosition로 이동
              if (map) {
                map.setCenter(
                  new naver.maps.LatLng(
                    initialPosition.latitude,
                    initialPosition.longitude
                  )
                );
                setReportPosition(initialPosition);
              }
              goBack();
            }}
          >
            취소
          </Button>
        </PositionBottom>
      </div>
    );
  }
);
