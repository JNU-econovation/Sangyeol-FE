import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";

const CourseSearchWebview = () => {
  return (
    <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.COURSE_SEARCH }} />
  );
};
export default CourseSearchWebview;
