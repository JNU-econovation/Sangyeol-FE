import Text from "@components/common/shared/ui/Text";
import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import useGetCurrentPosition from "@hooks/feature/location/useGetCurrentPosition";
import { useLocalSearchParams } from "expo-router";
// import { router } from "expo-router";

const CourseDetailWebview = () => {
  const { location } = useGetCurrentPosition();
  const { mountainId, courseId, params } = useLocalSearchParams<{
    mountainId: string;
    courseId: string;
    params: string;
  }>();

  return (
    <>
      <Text>Course Detail</Text>
      <WebViewWithInjected
        loadingBar
        source={{
          uri: PATH_ROUTE.WEBVIEW.MAP_COURSE_DETAIL({
            mountainId,
            courseId,
            params,
          }),
        }}
        onMessage={({ method, name, body }) => {
          if (name === "get-current-position" && method === "GET") {
            return {
              name: "get-current-position",
              status: "success",
              data: location,
            };
          }
          // if (name === "start-travel" && method === "POST") {
          //   router.push("/travel");
          //   return {
          //     name: "start-travel",
          //     status: "success",
          //   };
          // }
          return {
            name: "unknown-message",
            status: "error",
            data: "Unknown message received",
          };
        }}
      />
    </>
  );
};

export default CourseDetailWebview;
