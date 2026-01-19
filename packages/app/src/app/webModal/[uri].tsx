import ScreenContainer from "@components/common/shared/layout/Screen";
import {
  DISABLED_PINCH_GESTURE,
  DISABLED_SCROLL,
  DISABLED_TEXT_SELECT,
  INJECT_TOKEN,
  SET_VIEWPORT_RATE,
} from "@constants/webview";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import WebView from "react-native-webview";

const WebviewScreen = () => {
  const { accessToken, refreshToken } = useTokenStore();
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const sourceUri = decodeURIComponent(uri);

  const INJECTED_JAVASCRIPT = useMemo(
    () =>
      `${DISABLED_PINCH_GESTURE}${DISABLED_TEXT_SELECT}${DISABLED_SCROLL}${SET_VIEWPORT_RATE}${INJECT_TOKEN(accessToken ?? "", refreshToken ?? "")}`,
    [accessToken, refreshToken],
  );

  return (
    <ScreenContainer>
      <WebView
        source={{ uri: sourceUri }}
        style={{ flex: 1 }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onShouldStartLoadWithRequest={(request) => {
          // 띄우고자 하는 페이지만 뜨도록 설정
          if (
            request.url.startsWith(sourceUri) ||
            request.mainDocumentURL?.startsWith(sourceUri)
          ) {
            return true;
          }

          return false; //true로 해줘도 된다.
        }}
      />
    </ScreenContainer>
  );
};

export default WebviewScreen;
