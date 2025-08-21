import { useBridge } from "@/service/bridge";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useCallback } from "react";

const useRouteMountainCourseBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData<{ mountainName: string }>,
    MessageEventResponseData
  >();

  return useCallback(
    (mountainName: string) => {
      request({
        requestMessage: {
          method: "POST",
          name: "route-mountain-course",
          body: {
            mountainName,
          },
        },
      });
    },
    [request]
  );
};

export default useRouteMountainCourseBridge;
