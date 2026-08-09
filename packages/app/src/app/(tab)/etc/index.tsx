import WebViewWithInjected from "@shared/components/composites/WebViewWithInjected";
import WEB_PATH from "@shared/constants/WEB_PATH";

const ETCScreen = () => {
  return <WebViewWithInjected source={{ uri: WEB_PATH.ETC }} />;
};

export default ETCScreen;
