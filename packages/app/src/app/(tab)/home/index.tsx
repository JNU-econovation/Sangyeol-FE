import WebViewWithInjected from "@shared/components/composites/WebViewWithInjected";
import WEB_PATH from "@shared/constants/WEB_PATH";

const HomeScreen = () => {
  return <WebViewWithInjected source={{ uri: WEB_PATH.HOME }} />;
};

export default HomeScreen;
