import { useBridge } from "@geongyu/react-native-bridge/web";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@shared/types/bridge";
import { useCallback } from "react";

/**
 * 코스를 선택한 산행 시작 브릿지 훅
 */
const useStartTravelBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData<{ courseId: string; mountainId: string }>,
    MessageEventResponseData
  >();

  return useCallback(
    ({ courseId, mountainId }: { courseId: string; mountainId: string }) => {
      request({
        requestMessage: {
          name: "start-travel",
          method: "POST",
          body: { courseId, mountainId },
        },
      });
    },
    [request],
  );
};

export default useStartTravelBridge;
