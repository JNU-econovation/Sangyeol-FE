import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";

const MypageNotificationSettingWebview = () => {
  return (
    <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.TRAVEL_LOG }} />
  );
};

export default MypageNotificationSettingWebview;
