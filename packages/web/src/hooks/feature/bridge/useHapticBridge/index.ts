import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useBridge } from "bridge/web";
import { useCallback } from "react";

const useHapticBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData,
    MessageEventResponseData
  >();

  return useCallback(() => {
    request({
      requestMessage: {
        name: "haptic",
        method: "POST",
      },
    });
  }, [request]);
};

export default useHapticBridge;
