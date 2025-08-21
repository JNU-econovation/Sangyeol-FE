import { Coordinate } from "@/types/map";
import { useEffect, useRef } from "react";

export interface PolylineOptions {
  path: Coordinate[];
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeStyle?: naver.maps.StrokeStyleType;
  strokeLineCap?: naver.maps.StrokeLineCapType;
  strokeLineJoin?: naver.maps.StrokeLineJoinType;
}

interface UseDrawPathProps {
  map: any;
  paths: PolylineOptions[];
  enable?: boolean;
}

// 경로 표시 : [위도, 경도] 의 배열
const useDrawPath = ({ map, paths, enable = false }: UseDrawPathProps) => {
  const polylinesRef = useRef<naver.maps.Polyline[]>([]);

  useEffect(() => {
    if (!map || !enable) {
      return;
    }

    // 기존 폴리라인 제거
    polylinesRef.current.forEach((polyline) => {
      polyline.setMap(null);
    });
    polylinesRef.current = [];

    const drawPolyline = ({
      path,
      strokeWeight = 4,
      strokeColor = "#FF0000",
      strokeOpacity = 0.6,
      strokeStyle = "solid",
      strokeLineCap = "round",
      strokeLineJoin = "round",
    }: PolylineOptions) => {
      if (!enable) return;

      const polyline = new naver.maps.Polyline({
        map,
        path,
        strokeWeight,
        strokeColor,
        strokeOpacity,
        strokeStyle,
        strokeLineCap,
        strokeLineJoin,
      });

      polylinesRef.current.push(polyline);
    };

    if (paths.length > 0) {
      paths.forEach((options) => {
        drawPolyline(options);
      });
    }
  }, [enable, map, paths]);

  useEffect(() => {
    return () => {
      polylinesRef.current.forEach((polyline) => {
        polyline.setMap(null);
      });
    };
  }, []);
};

export default useDrawPath;
