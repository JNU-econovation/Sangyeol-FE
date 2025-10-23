import { Coordinate } from "@model/map";

const SOCKET = {
  MESSAGE_EVENT_NAME: {
    START: "start",
    CURRENT_POSITION: "current-position",
    PAUSE: "pause",
    RESTART: "restart",
    END: "end",
  },
  MESSAGE: {
    START: (coordinate: Coordinate) => ({
      event: "start",
      data: {
        coordinate,
        time: Date.now(),
      },
    }),
    CURRENT_POSITION: (coordinate: Coordinate) => ({
      event: "current-position",
      data: {
        coordinate,
      },
    }),
    PAUSE: () => ({
      event: "pause",
      data: {
        time: Date.now(),
      },
    }),
    RESTART: (coordinate: Coordinate) => ({
      event: "restart",
      data: {
        time: Date.now(),
        coordinate,
      },
    }),
    END: (coordinate: Coordinate, totalTravelTime: number) => ({
      event: "end",
      data: {
        coordinate,
        time: Date.now(),
        totalTravelTime,
      },
    }),
  },
} as const;

export default Object.freeze(SOCKET);
