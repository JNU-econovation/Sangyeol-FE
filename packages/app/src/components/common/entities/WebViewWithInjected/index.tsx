import {
  DISABLED_PINCH_GESTURE,
  DISABLED_SCROLL,
  DISABLED_TEXT_SELECT,
  INJECT_TOKEN,
  SET_VIEWPORT_RATE,
} from "@constants/webview";
import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@model/webview";
import { useTokenStore } from "@store/secureStorage/useTokenStore/index";
import { COLORS } from "@styles/colorPalette";
import { WebviewWithBridge } from "@geongyu/bridge/native";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, View } from "react-native";
import WebView from "react-native-webview";
import type {
  WebViewNavigation,
  WebViewSource,
} from "react-native-webview/lib/WebViewTypes";

import useMiddleware from "./hooks/useMiddleware";
import useWebviewHistory from "./hooks/useWebViewHistory";

type OnMessage = (
  reqMessage: MessageEventRequestData,
) => MessageEventResponseData | void;

type PromiseOnMessage = ({
  method,
  name,
}: MessageEventRequestData<unknown>) => Promise<MessageEventResponseData | void>;

interface WebViewWithInjectedProps {
  ref?: React.RefObject<WebView | null>;
  source: WebViewSource;
  onMessage?: OnMessage | PromiseOnMessage;
  onReadyToMessage?: () => void;
  loadingBar?: boolean;
  onNavigate?: (arg: WebViewNavigation) => void;
}

const WebViewWithInjected = ({
  ref,
  source,
  onMessage,
  onReadyToMessage,
  loadingBar = false,
  onNavigate,
}: WebViewWithInjectedProps) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, refreshToken } = useTokenStore();
  const { webViewRef, onNavigationStateChange } = useWebviewHistory();
  const { middleware } = useMiddleware();

  const INJECTED_JAVASCRIPT = useMemo(
    () =>
      `${DISABLED_PINCH_GESTURE}${DISABLED_TEXT_SELECT}${DISABLED_SCROLL}${SET_VIEWPORT_RATE}${INJECT_TOKEN(accessToken ?? "", refreshToken ?? "")}`,
    [accessToken, refreshToken],
  );

  useEffect(() => {
    if (ref) {
      ref.current = webViewRef.current;
    }
  }, [webViewRef.current, ref]);

  return (
    <View style={{ flex: 1 }}>
      {loadingBar && isLoading && (
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              height: 2,
              backgroundColor: COLORS.primary,
              zIndex: 9999,
              width: "100%",
              borderTopEndRadius: 1,
              borderBottomEndRadius: 1,
            },
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      )}

      <WebviewWithBridge<MessageEventRequestData, MessageEventResponseData>
        source={source}
        style={{ flex: 1 }}
        ref={webViewRef}
        // ref={ref}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onBridgeMessage={onMessage}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadProgress={({ nativeEvent }) => {
          progressAnim.setValue(nativeEvent.progress);
        }}
        onLoadEnd={() => {
          progressAnim.setValue(0);
          setIsLoading(false);
        }}
        // cacheEnabled={false}
        // cacheMode="LOAD_NO_CACHE"
        allowsLinkPreview={false}
        middleware={middleware}
        onReadyToMessage={onReadyToMessage}
        strictMode={false}
        // 뒤로가기, 앞으로가기 기능
        onNavigationStateChange={(navState) =>
          onNavigationStateChange(navState, onNavigate)
        }
        webviewDebuggingEnabled={__DEV__}
        bounces={false}
        scrollEnabled={true}
        decelerationRate={0.998}
        contentInsetAdjustmentBehavior="never"
      />
    </View>
  );
};

export default WebViewWithInjected;
