import type { Coordinate } from "@model/map";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@model/webview";
import usePostMessageBridge from "@service/bridge/hooks/usePostMessageBridge";
import { useCallback } from "react";

interface Path {
  path: Coordinate[];
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number; //도형의 선 불투명도입니다.
  strokeStyle?:
    | "solid"
    | "shortdash"
    | "shortdot"
    | "shortdashdot"
    | "shortdashdotdot"
    | "dot"
    | "dash"
    | "longdash"
    | "dashdot"
    | "longdashdot"
    | "longdashdotdot"; //도형의 선 스타일입니다.
  strokeLineCap?: "butt" | "round" | "square"; //도형에 사용되는 선의 마감 스타일입니다.
  strokeLineJoin?: "round" | "miter" | "bevel"; // 도형에 사용되는 선들이 맞닿는 부분의 마감 스타일입니다.
}

const useSetMapPolylineBridge = () => {
  const { ref, postMessage } = usePostMessageBridge<
    MessageEventRequestData<{ paths: Path[] }>,
    MessageEventResponseData
  >();

  const sendSetMapPolylineMessage = useCallback(
    (paths: Path[]) => {
      if (!ref.current) {
        console.warn("[useSetMapPolylineBridge] WebView ref is not available");
        return;
      }
      postMessage({
        message: {
          method: "POST",
          name: "set-map-polyline",
          body: { paths },
        },
      });
    },
    [ref, postMessage],
  );

  return {
    ref,
    sendSetMapPolylineMessage,
  };
};

export default useSetMapPolylineBridge;
