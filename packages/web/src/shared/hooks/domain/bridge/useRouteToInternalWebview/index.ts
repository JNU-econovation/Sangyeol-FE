import ROUTE from "@shared/constants/route";
import { useBridge } from "@geongyu/react-native-bridge/web";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@shared/types/bridge";
import { useCallback } from "react";

const useRouteToInternalWebview = () => {
  const { request } = useBridge<
    MessageEventRequestData<{ uri: string }>,
    MessageEventResponseData
  >();

  return useCallback(
    (route: keyof typeof ROUTE) => {
      request({
        requestMessage: {
          method: "POST",
          name: "route-to-internal-webview",
          body: {
            uri:
              typeof ROUTE[route] === "string"
                ? ROUTE[route]
                : (ROUTE[route] as () => string)(),
          },
        },
      });
    },
    [request],
  );
};

export default useRouteToInternalWebview;
