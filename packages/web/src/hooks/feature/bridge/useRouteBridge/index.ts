import { useBridge } from "@/service/bridge";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useCallback } from "react";

type RouteBridgePath =
  | "change-password"
  | "check-terms"
  | "course-bookmark"
  | "course-detail"
  | "course-search"
  | "travel-log"
  | "manual-detail"
  | "mountain-course"
  | "my-info"
  | "notification-setting"
  | "starter"
  | "start-travel"
  | "customer-center";

interface RouteBridgeRequest {
  path: RouteBridgePath;
  routeType: "push" | "replace";
  params?: Record<string, string>[];
}

const useRouteBridge = (body: RouteBridgeRequest) => {
  const { request } = useBridge<
    MessageEventRequestData<RouteBridgeRequest>,
    MessageEventResponseData
  >();

  return useCallback(() => {
    request({
      requestMessage: {
        method: "POST",
        name: "route-to",
        body,
      },
    });
  }, [body, request]);
};

export default useRouteBridge;
