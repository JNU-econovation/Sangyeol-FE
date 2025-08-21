import { useBridge } from "@/service/bridge";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useCallback } from "react";

const useRouteCourseDetail = () => {
  const { request } = useBridge<
    MessageEventRequestData,
    MessageEventResponseData
  >();

  return useCallback(() => {
    request({
      requestMessage: {
        name: "route-course-detail",
        method: "POST",
      },
    });
  }, [request]);
};

export default useRouteCourseDetail;
