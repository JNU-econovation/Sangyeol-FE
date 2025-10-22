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
    START: (coordinate: Coordinate, courseId: string) => ({
      event: "start",
      data: {
        coordinate,
        time: Date.now(),
        courseId,
      },
    }),
    CURRENT_POSITION: (coordinate: Coordinate, courseId: string) => ({
      event: "current-position",
      data: {
        coordinate,
        courseId,
      },
    }),
    PAUSE: (courseId: string) => ({
      event: "pause",
      data: {
        time: Date.now(),
        courseId,
      },
    }),
    RESTART: (coordinate: Coordinate, courseId: string) => ({
      event: "restart",
      data: {
        time: Date.now(),
        coordinate,
        courseId,
      },
    }),
    END: (
      coordinate: Coordinate,
      totalTravelTime: number,
      courseId: string,
    ) => ({
      event: "end",
      data: {
        coordinate,
        time: Date.now(),
        totalTravelTime,
        courseId,
      },
    }),
  },
} as const;

export default Object.freeze(SOCKET);
