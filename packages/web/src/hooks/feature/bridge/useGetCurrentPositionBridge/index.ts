import { useCallback } from "react";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useBridge } from "@/service/bridge";

interface Coords {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
}

export interface Position {
  coords: Coords;
  timestamp: number;
}

type OnResponse = (position: Position) => void;

const useGetCurrentPositionBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData<null>,
    MessageEventResponseData<Position>
  >();

  return useCallback(
    (onResponse: OnResponse) => {
      request({
        requestMessage: {
          name: "get-current-position",
          method: "GET",
        },
        responseCallback: ({ data }) => {
          if (!data) return;
          onResponse(data);
        },
      });
    },
    [request]
  );
};

export default useGetCurrentPositionBridge;
