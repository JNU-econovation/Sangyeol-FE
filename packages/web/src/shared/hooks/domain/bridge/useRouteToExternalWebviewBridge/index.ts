import { useBridge } from "@geongyu/react-native-bridge/web";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@shared/types/bridge";
import { useCallback } from "react";

/**
 * 외부 URL을 앱의 아우터 웹뷰(모달)로 여는 브릿지 훅
 */
const useRouteToExternalWebviewBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData<{ uri: string }>,
    MessageEventResponseData
  >();

  return useCallback(
    (uri: string) => {
      request({
        requestMessage: {
          method: "POST",
          name: "route-to-external-webview",
          body: { uri },
        },
      });
    },
    [request],
  );
};

export default useRouteToExternalWebviewBridge;
