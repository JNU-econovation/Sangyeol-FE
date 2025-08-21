import { useBridge } from "@/service/bridge";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
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
    [request]
  );
};

export default useLogBridge;
