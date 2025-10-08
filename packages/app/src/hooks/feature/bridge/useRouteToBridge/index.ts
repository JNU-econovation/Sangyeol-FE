import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@model/webview";
import { usePostMessageBridge } from "bridge/native";
import { useCallback } from "react";

export type RouteType = "push" | "replace" | "dismiss";

/**
 * 해당 훅은 웹뷰의 url을 변경하는 브리지입니다.
 */
const useRouteToBridge = (): {
  ref: ReturnType<typeof usePostMessageBridge>["ref"];
  routeTo: (params: { routeType: RouteType; url: string }) => void;
} => {
  const { ref, postMessage } = usePostMessageBridge<
    MessageEventRequestData<{
      routeType: RouteType;
      url: string;
    }>,
    MessageEventResponseData
  >();

  const routeTo = useCallback(
    ({ routeType, url }: { routeType: RouteType; url: string }) => {
      if (!ref.current) {
        console.warn("[useRouteToBridge] WebView ref is not available");
        return;
      }

      postMessage({
        message: {
          method: "POST",
          name: "route-to",
          body: { routeType, url },
        },
      });
    },
    [ref, postMessage],
  );

  return {
    ref,
    routeTo,
  };
};

export default useRouteToBridge;
