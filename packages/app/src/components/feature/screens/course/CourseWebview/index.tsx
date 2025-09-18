import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import useGetCurrentPosition from "@hooks/feature/location/useGetCurrentPosition";
import { router } from "expo-router";

const CourseWebview = () => {
  const { location } = useGetCurrentPosition();
  return (
    <WebViewWithInjected
      source={{ uri: PATH_ROUTE.WEBVIEW.MOUNTAIN }}
      loadingBar
      onMessage={({ method, name, body }) => {
        if (name === "start-travel" && method === "POST") {
          if (
            !body ||
            typeof body !== "object" ||
            !("courseId" in body) ||
            !("mountainId" in body) ||
            typeof body.courseId !== "string" ||
            typeof body.mountainId !== "string"
          ) {
            return {
              name: "start-travel",
              status: "error",
              error: "courseId and mountainId are required",
            };
          }

          const { courseId, mountainId } = body;
          router.push(`/travel/${mountainId}/${courseId}`);
          return {
            name: "start-travel",
            status: "success",
          };
        }
        if (name === "get-current-position" && method === "GET") {
          return {
            name: "get-current-position",
            status: "success",
            data: location,
          };
        }

        return {
          name: "unknown",
          status: "error",
        };
      }}
    />
  );
};

export default CourseWebview;
