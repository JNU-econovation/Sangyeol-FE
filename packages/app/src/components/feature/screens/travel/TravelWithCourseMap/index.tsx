import useCoursePathwayQuery from "@hooks/feature/query/query/useCoursePathwayQuery";
import useGetRealtimeHeading from "@hooks/feature/useGetRealtimeHeading";
import useRealTimeLocation from "@hooks/feature/useRealTimeLocation";
import {
  NaverMapCircleOverlay,
  NaverMapPolygonOverlay,
  NaverMapPolylineOverlay,
  NaverMapView,
} from "@mj-studio/react-native-naver-map";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import {
  coordConvertor,
  createViewDirectionPolygon,
  getScaledRadius,
} from "@utils/map";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";

const TravelWithCourseMap = () => {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const { location, isLoading: isLocationLoading } = useRealTimeLocation({
    accuracy: "highest",
    timeInterval: 2000,
    distanceInterval: 2,
  });
  const { heading, isLoading: isHeadingLoading } = useGetRealtimeHeading();
  const [zoomLevel, setZoomLevel] = useState(16);
  const traveledPath = useTravelStateStore().traveledPath.map(
    ([longitude, latitude]) => ({ latitude, longitude }),
  );

  const {
    data: { pathways },
  } = useCoursePathwayQuery({
    courseId,
  });

  const courses = useMemo(() => {
    return pathways
      .map(({ coordinates }) => {
        return coordinates.map((coord) => {
          return { latitude: coord[1], longitude: coord[0] };
        });
      })
      .flat() as unknown as { latitude: number; longitude: number }[];
  }, [pathways]);

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
      {/* 사용자가 선택한 코스 */}
      <NaverMapPolylineOverlay
        coords={courses}
        color={COLORS.gray700}
        width={4}
      />
      {/* 사용자가 지나온 길 */}
      <NaverMapPolylineOverlay
        coords={traveledPath.length > 0 ? traveledPath : courses}
        color={COLORS.green800}
        width={4}
        zIndex={1}
      />
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
              radius: getScaledRadius(layer.radius, zoomLevel),
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
        radius={getScaledRadius(6, zoomLevel)}
        color={COLORS.green800}
        globalZIndex={51}
      />
      <NaverMapCircleOverlay
        latitude={location.coords.latitude}
        longitude={location.coords.longitude}
        radius={getScaledRadius(12, zoomLevel)}
        color={COLORS.mainWhite}
        globalZIndex={50}
      />
    </NaverMapView>
  );
};

export default TravelWithCourseMap;
