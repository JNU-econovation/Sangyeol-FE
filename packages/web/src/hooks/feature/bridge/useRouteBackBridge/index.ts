import { useBridge } from "@/service/bridge";
import { useCallback } from "react";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";

const useRouteBackBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData,
    MessageEventResponseData
  >();

  return useCallback(() => {
    request({
      requestMessage: {
        method: "POST",
        name: "route-back",
      },
    });
  }, [request]);
};

export default useRouteBackBridge;
