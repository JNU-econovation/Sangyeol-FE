import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import useTravelCourse from "@hooks/feature/travel/useTravelCourse";
// import useGetCurrentPosition from "@hooks/feature/useGetCurrentPosition";
import useRealTimeLocation from "@hooks/feature/location/useRealTimeLocation";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

/**
 * 코스를 지정하고 산행하는 웹뷰 컴포넌트
 * 해당 컴포넌트는 사용하지 않습니다!!!!!
 */

const TravelWithCourseMapWebview = () => {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const { ref, connect } = useTravelCourse({
    mountainId: "1",
    courseId: courseId ?? "1",
  });
  const { location } = useRealTimeLocation({
    accuracy: "high",
    distanceInterval: 1,
    timeInterval: 1000,
  });

  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <WebViewWithInjected
      ref={ref}
      source={{
        uri: PATH_ROUTE.WEBVIEW.TRAVEL,
      }}
      onMessage={({ method, name, body }) => {
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

export default TravelWithCourseMapWebview;
