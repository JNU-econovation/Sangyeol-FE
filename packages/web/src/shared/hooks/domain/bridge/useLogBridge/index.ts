import { useBridge } from "@geongyu/react-native-bridge/web";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@shared/types/bridge";
import { useCallback } from "react";

const useLogBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData,
    MessageEventResponseData
  >();

  return useCallback(
    (message: unknown) => {
      request({
        requestMessage: {
          name: "log-message",
          method: "POST",
          body: message,
        },
      });
    },
    [request],
  );
};

export default useLogBridge;
