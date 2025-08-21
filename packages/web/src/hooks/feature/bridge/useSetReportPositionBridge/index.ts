import { useCallback } from "react";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useBridge } from "@/service/bridge";

interface Position {
  latitude: number;
  longitude: number;
}

const useSetReportPositionBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData<Position>,
    MessageEventResponseData
  >();

  return useCallback(
    (position: Position) => {
      request({
        requestMessage: {
          name: "set-report-position",
          method: "POST",
          body: position,
        },
      });
    },
    [request]
  );
};

export default useSetReportPositionBridge;
