import { useBridge } from "@geongyu/react-native-bridge/web";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@shared/types/bridge";
import { useCallback } from "react";

const useRouteChangePasswordBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData,
    MessageEventResponseData
  >();

  return useCallback(() => {
    request({
      requestMessage: {
        method: "POST",
        name: "route-change-password",
      },
    });
  }, [request]);
};

export default useRouteChangePasswordBridge;
