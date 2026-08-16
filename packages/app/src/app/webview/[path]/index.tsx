import WebViewWithInjected from "@shared/components/composites/WebViewWithInjected";
import { useLocalSearchParams } from "expo-router";

const WebviewScreen = () => {
  const { path } = useLocalSearchParams<{ path: string }>();

  const uri = "" + process.env.EXPO_PUBLIC_WEB_BASE_URI + path;

  return <WebViewWithInjected source={{ uri }} />;
};

export default WebviewScreen;
