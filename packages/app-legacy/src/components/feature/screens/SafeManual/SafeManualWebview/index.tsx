import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";

const SafeManualWebview = () => {
  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.SAFE_MANUAL,
      }}
    />
  );
};

export default SafeManualWebview;
