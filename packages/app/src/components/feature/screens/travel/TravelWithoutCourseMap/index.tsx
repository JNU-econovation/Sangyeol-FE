import useGetRealtimeHeading from "@hooks/feature/useGetRealtimeHeading";
import useRealTimeLocation from "@hooks/feature/useRealTimeLocation";
import {
  NaverMapCircleOverlay,
  NaverMapPolygonOverlay,
  NaverMapView,
} from "@mj-studio/react-native-naver-map";
import {
  coordConvertor,
  createViewDirectionPolygon,
  getScaledRadius,
} from "@utils/map";
import { useState } from "react";

const TravelWithoutCourseMap = () => {
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
      logoAlign="BottomLeft"
      logoMargin={{ bottom: 200, left: 20 }}
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

export default TravelWithoutCourseMap;
