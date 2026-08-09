import { usePostMessageBridge } from "@geongyu/react-native-bridge/native";
import type { Coordinate } from "@shared/types/map";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@shared/types/webview";
import { useCallback } from "react";

export interface Path {
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

/**
 * 해당 훅은 웹뷰의 지도에 폴리라인을 그리는 브리지입니다.
 */
const useSetMapPolylineBridge = (): {
  ref: ReturnType<typeof usePostMessageBridge>["ref"];
  sendSetMapPolylineMessage: (paths: Path[]) => void;
} => {
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
