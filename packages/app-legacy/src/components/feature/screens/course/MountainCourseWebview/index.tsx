import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { router, useLocalSearchParams } from "expo-router";

const MountainCourseWebview = () => {
  const { mountainId } = useLocalSearchParams() as {
    mountainId: string;
  };

  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.COURSE_SEARCH_RESULT({ mountainId }),
      }}
    />
  );
};

export default MountainCourseWebview;
