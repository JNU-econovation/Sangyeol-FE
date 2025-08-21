import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";

const MypageMyInfoWebview = () => {
  return <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.MY_INFO }} />;
};

export default MypageMyInfoWebview;
