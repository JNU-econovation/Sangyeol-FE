import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";

const MypageTravelLogWebview = () => {
  return (
    <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.TRAVEL_LOG }} />
  );
};

export default MypageTravelLogWebview;
