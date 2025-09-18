import useRealTimeLocation from "@hooks/feature/location/useRealTimeLocation";
import { NaverMapMarkerOverlay } from "@mj-studio/react-native-naver-map";
import { memo } from "react";

const CurrentPosition = memo(() => {
  const { location, isLoading: isLocationLoading } = useRealTimeLocation({
    accuracy: "highest",
    timeInterval: 2000,
    distanceInterval: 2,
  });

  if (isLocationLoading || !location) return null;

  return (
    <NaverMapMarkerOverlay
      latitude={location.coords.latitude}
      longitude={location.coords.longitude}
      image={require("@assets/images/Current_Position.png")}
      anchor={{ x: 0.5, y: 0.5 }}
    />
  );
});

export default CurrentPosition;
