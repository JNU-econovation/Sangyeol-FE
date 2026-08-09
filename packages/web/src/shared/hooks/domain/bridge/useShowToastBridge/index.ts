import { useBridge } from "@geongyu/react-native-bridge/web";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@shared/types/bridge";
import { useCallback } from "react";

interface ShowToastBridgeParams {
  type: "success" | "info" | "error";
  text1: string;
  text2: string;
}

const useShowToastBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData,
    MessageEventResponseData
  >();

  return useCallback(
    (props: ShowToastBridgeParams) => {
      request({
        requestMessage: {
          name: "show-toast",
          method: "POST",
          body: props,
        },
      });
    },
    [request],
  );
};

export default useShowToastBridge;
