import useGetRealtimeHeading from "@hooks/feature/location/useGetRealtimeHeading";
import useRealTimeLocation from "@hooks/feature/location/useRealTimeLocation";
import { NaverMapPolygonOverlay } from "@mj-studio/react-native-naver-map";
import {
  coordConvertor,
  createViewDirectionPolygon,
  getScaledRadius,
} from "@utils/map";
import { memo } from "react";

//TODO: 상위에서 데이터를 의존하면서, 몇몇은 내부에서 데이터를 의존하는 형태가 있음. 둘 중 하나로 통일해야함
interface HeadPolygonProps {
  zoomLevel: number;
}

const HeadPolygon = memo(({ zoomLevel }: HeadPolygonProps) => {
  const { heading, isLoading: isHeadingLoading } = useGetRealtimeHeading();
  const { location, isLoading: isLocationLoading } = useRealTimeLocation({
    accuracy: "highest",
    timeInterval: 5000,
    distanceInterval: 5,
  });

  if (isHeadingLoading || isLocationLoading || !location) return null;

  return (
    <>
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
    </>
  );
});

export default HeadPolygon;
