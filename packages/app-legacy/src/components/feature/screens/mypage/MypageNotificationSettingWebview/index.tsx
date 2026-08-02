import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";

// [!warning] 더 이상 사용하지 않습니다! 해당 페이지는 앱에서 구현합니다
const MypageNotificationSettingWebview = () => {
  return (
    <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.TRAVEL_LOG }} />
  );
};

export default MypageNotificationSettingWebview;
