import {
  DISABLED_PINCH_GESTURE,
  DISABLED_SCROLL,
  DISABLED_TEXT_SELECT,
  INJECT_TOKEN,
  SET_VIEWPORT_RATE,
} from "@constants/webview";
import useGetCurrentPosition from "@hooks/feature/useGetCurrentPosition";
import useRealTimeLocation from "@hooks/feature/useRealTimeLocation";
import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@model/webview";
import WebviewWithBridge from "@service/bridge/components/WebviewWithBridge";
import useToast from "@service/toast";
import { useTokenStore } from "@store/secureStorage/useTokenStore/index";
import { COLORS } from "@styles/colorPalette";
import { getPathToRoute } from "@utils/bridge";
import { logMessageWithTime } from "@utils/log";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, BackHandler, View } from "react-native";
import WebView from "react-native-webview";
import type { WebViewSource } from "react-native-webview/lib/WebViewTypes";

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
}

const WebViewWithInjected = ({
  ref,
  source,
  onMessage,
  onReadyToMessage,
  loadingBar = false,
}: WebViewWithInjectedProps) => {
  const webViewRef = useRef<WebView>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const showToast = useToast();

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { accessToken, refreshToken } = useTokenStore();

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

  const middleware = useCallback((reqMessage: MessageEventRequestData) => {
    logMessageWithTime(`WebView received: \n${JSON.stringify(reqMessage)}`);

    const { name, method, body } = reqMessage;

    if (name === ("log-message" as string)) {
      console.log(body);
      return;
    }

    // 라우팅 메시지 처리
    if (name === ("route-to" as string) && method === "POST") {
      const { path, routeType, params } = body as {
        path: string;
        routeType?: "replace" | "push";
        params?: Record<string, any>[];
      };

      routeType === "replace"
        ? router.replace(getPathToRoute({ path, params }))
        : router.push(getPathToRoute({ path, params }));

      // TODO: 동적 에러처리 필요

      return {
        name: "route-to",
        status: "success",
      };
    }

    // 뒤로가기 메시지 처리
    if (name === "route-back" && method === "POST") {
      try {
        router.back();
      } catch (error) {
        console.warn(error);
        router.push("/(tabs)/home");
      }

      return {
        name: "route-back",
        status: "success",
      };
    }

    // 토스트 메시지 처리
    if (name === "show-toast" && method === "POST") {
      const toastProps = body as {
        type: "success" | "info" | "error";
        text1: string;
        text2: string;
      };

      showToast(toastProps);

      return {
        name: "show-toast",
        status: "success",
      };
    }
  }, []);

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
              backgroundColor: COLORS.mainGreen,
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
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        allowsLinkPreview={false}
        middleware={middleware}
        onReadyToMessage={onReadyToMessage}
        strictMode={false}
        // 뒤로가기, 앞으로가기 기능
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
          setCanGoForward(navState.canGoForward);
        }}
        webviewDebuggingEnabled={true}
      />
    </View>
  );
};

export default WebViewWithInjected;
