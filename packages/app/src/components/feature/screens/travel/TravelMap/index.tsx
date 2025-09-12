import useGetRealtimeHeading from "@hooks/feature/useGetRealtimeHeading";
import useRealTimeLocation from "@hooks/feature/useRealTimeLocation";
import {
  NaverMapCircleOverlay,
  NaverMapPolygonOverlay,
  NaverMapView,
} from "@mj-studio/react-native-naver-map";
import { useState } from "react";

const coordConvertor = (arr: [number, number][]) => {
  return arr.map(([longitude, latitude]) => ({ latitude, longitude }));
};

// 부채꼴 폴리곤 좌표 생성 함수
const createViewDirectionPolygon = ({
  centerLat,
  centerLng,
  heading, // 방향 (도)
  radius = 50, // 반경 (미터)
  angle = 60, // 부채꼴 각도 (도)
}: {
  centerLat: number;
  centerLng: number;
  heading: number;
  radius?: number;
  angle?: number;
}) => {
  const coords: [number, number][] = [];

  // 중심점
  coords.push([centerLng, centerLat]);

  // 부채꼴 호 생성
  const startAngle = heading - angle / 2;
  const endAngle = heading + angle / 2;

  for (let i = 0; i <= 20; i++) {
    const currentAngle = startAngle + (endAngle - startAngle) * (i / 20);
    // 북쪽을 0도로 맞추기 위해 90도 빼기
    const radian = ((currentAngle - 90) * Math.PI) / 180;

    // 위도, 경도 계산 수정
    const lat = centerLat + (radius / 111000) * Math.sin(radian);
    const lng =
      centerLng +
      (radius / (111000 * Math.cos((centerLat * Math.PI) / 180))) *
        Math.cos(radian);

    coords.push([lng, lat]);
  }

  // 다시 중심점으로 닫기
  coords.push([centerLng, centerLat]);

  return coords;
};

// 줌 레벨에 따른 크기 계산 함수
const getScaledRadius = (baseRadius: number, zoomLevel: number) => {
  // 줌 16을 기준으로 크기 조정
  const scale = Math.pow(2, 16 - zoomLevel);
  return baseRadius * scale;
};

const TravelMap = () => {
  const { location, isLoading: isLocationLoading } = useRealTimeLocation({
    accuracy: "highest",
    timeInterval: 2000,
    distanceInterval: 2,
  });
  const { heading, isLoading: isHeadingLoading } = useGetRealtimeHeading();
  const [zoomLevel, setZoomLevel] = useState(16);

  if (isLocationLoading || !location || isHeadingLoading) {
    return null;
  }

  return (
    <NaverMapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }}
      initialCamera={{
        zoom: 16,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }}
      isShowLocationButton={false}
      isShowZoomControls={false}
      onCameraChanged={(event) => {
        setZoomLevel(event.zoom);
      }}
    >
      {/* <NaverMapPathOverlay coords={coordConvertor(traveledPath)} /> */}
      {Array.from({ length: 10 }, (_, i) => ({
        radius: 50 - i * 5, // 50m부터 1m까지 5m 간격
        opacity: "05",
        zIndex: i,
      })).map((layer, index) => (
        <NaverMapPolygonOverlay
          key={index}
          coords={coordConvertor(
            createViewDirectionPolygon({
              centerLat: location.coords.latitude,
              centerLng: location.coords.longitude,
              heading,
              radius: getScaledRadius(layer.radius, zoomLevel), // 줌에 따라 크기 조정
              angle: 50, // 각도
            }),
          )}
          color={`#2D6EFF${layer.opacity}`}
          globalZIndex={layer.zIndex}
        />
      ))}
      <NaverMapCircleOverlay
        latitude={location.coords.latitude}
        longitude={location.coords.longitude}
        radius={getScaledRadius(6, zoomLevel)} // 줌에 따라 크기 조정
        color={"#41956A"}
        globalZIndex={51}
      />
      <NaverMapCircleOverlay
        latitude={location.coords.latitude}
        longitude={location.coords.longitude}
        radius={getScaledRadius(12, zoomLevel)} // 줌에 따라 크기 조정
        color={"#ffffff"}
        globalZIndex={50}
      />
    </NaverMapView>
  );
};

export default TravelMap;
