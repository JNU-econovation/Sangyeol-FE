import { useBridge } from "@/service/bridge";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useCallback } from "react";

const useStartTravelBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData<{ courseId: string }>,
    MessageEventResponseData
  >();

  return useCallback(
    (courseId: string) => {
      request({
        requestMessage: {
          name: "start-travel",
          method: "POST",
          body: { courseId },
        },
      });
    },
    [request]
  );
};

export default useStartTravelBridge;
