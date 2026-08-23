import { useBridge } from "@geongyu/react-native-bridge/web";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@shared/types/bridge";
import { useCallback } from "react";

/**
 * 네이버 지도 앱으로 도착지까지의 길찾기를 실행하는 브릿지 훅
 */
const useOpenNaverMapRouteBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData<{ dlat: number; dlng: number; dname: string }>,
    MessageEventResponseData
  >();

  return useCallback(
    ({ dlat, dlng, dname }: { dlat: number; dlng: number; dname: string }) => {
      request({
        requestMessage: {
          name: "open-naver-map-route",
          method: "POST",
          body: { dlat, dlng, dname },
        },
      });
    },
    [request],
  );
};

export default useOpenNaverMapRouteBridge;
