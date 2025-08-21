import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import useTravelWithoutCourse from "@hooks/feature/travel/useTravelWithoutCourse";
import useGetCurrentPosition from "@hooks/feature/useGetCurrentPosition";
import useRealTimeLocation from "@hooks/feature/useRealTimeLocation";
import { useEffect } from "react";

const TravelWithoutCourseMapWebview = () => {
  const { ref, connect } = useTravelWithoutCourse();
  const { location } = useRealTimeLocation({
    accuracy: "high",
    distanceInterval: 1,
    timeInterval: 1000,
  });

  useEffect(() => {
    connect();
  }, []);

  return (
    <WebViewWithInjected
      ref={ref}
      source={{
        uri: PATH_ROUTE.WEBVIEW.TRAVEL,
      }}
      onMessage={({ method, name }) => {
        if (name === "get-current-position" && method === "GET") {
          return {
            name: "get-current-position",
            status: "success",
            data: location,
          };
        }
      }}
    />
  );
};

export default TravelWithoutCourseMapWebview;
