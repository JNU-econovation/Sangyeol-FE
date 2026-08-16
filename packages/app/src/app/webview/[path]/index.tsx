import WebViewWithInjected from "@shared/components/composites/WebViewWithInjected";
import { useWebviewHistoryStore } from "@shared/model/webviewHistoryStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

const WebviewScreen = () => {
  const { path } = useLocalSearchParams<{ path: string }>();
  const setCanGoBack = useWebviewHistoryStore((state) => state.setCanGoBack);

  const uri = "" + process.env.EXPO_PUBLIC_WEB_BASE_URI + path;

  useEffect(() => {
    return () => {
      setCanGoBack(false);
    };
  }, [setCanGoBack]);

  return (
    <WebViewWithInjected
      source={{ uri }}
      onNavigate={({ canGoBack }) => setCanGoBack(canGoBack)}
    />
  );
};

export default WebviewScreen;
