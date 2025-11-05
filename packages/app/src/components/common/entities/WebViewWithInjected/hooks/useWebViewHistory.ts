import { useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";
import WebView, { WebViewNavigation } from "react-native-webview";

/**
 * WebViewWithInjected 컴포넌트에서 웹뷰의 뒤로가기, 앞으로가기 기능을 관리하는 커스텀 훅
 */
const useWebviewHistory = () => {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack) {
        webViewRef.current?.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, [webViewRef, canGoBack]);

  const onNavigationStateChange = (
    navState: WebViewNavigation,
    onNavigate?: (arg: WebViewNavigation) => void,
  ) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    onNavigate && onNavigate(navState);
  };

  return {
    webViewRef,
    canGoBack,
    canGoForward,
    onNavigationStateChange,
  };
};

export default useWebviewHistory;
