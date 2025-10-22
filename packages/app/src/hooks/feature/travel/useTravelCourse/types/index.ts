import SOCKET from "../constants";

type SocketMessageResponseData = {
  index: number;
  isArrived: boolean;
  isDeviation: boolean;
  travelDistance: number;
  remainTimeToStopover: number;
  remainTimeToEnd: number;
};

export type SocketMessageResponse = {
  event: (typeof SOCKET.MESSAGE_EVENT_NAME)[keyof typeof SOCKET.MESSAGE_EVENT_NAME];
  status: "success" | "error";
  data: SocketMessageResponseData;
};
