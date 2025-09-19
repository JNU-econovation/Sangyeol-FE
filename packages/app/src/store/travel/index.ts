import { Coordinate } from "@model/map";
import { TravelState } from "@model/travel";
import { create } from "zustand";

type TravelTimelogType = "start" | "pause" | "restart" | "end";

interface TravelStateStore {
  travelState: TravelState;
  intervalId: number | null;
  distance: number;
  traveledPath: Coordinate[];
  connectedURL: string | null;
  timelog: [TravelTimelogType, number][];
  remainTimeToStopover: number | null; // 다음 베이스까지 남은 시간 (밀리초 단위)
  remainTimeToEnd: number | null; // 코스 종료 지점까지 남은 시간 (밀리초 단위)
  travelType: "with-course" | "without-course" | null;
  travelData: {
    mountainId?: string;
    courseId?: string;
  };

  setTravelState: (state: TravelState) => void;
  setIntervalId: (id: number | null) => void; // 인터벌 ID 설정 함수. 이는 지속적으로 소캣 서버로 위치를 전송하는 데 사용된다.
  clearIntervalId: () => void;
  setDistance: (distance: number) => void;
  pushTraveledPath: (path: Coordinate) => void;
  setConnectedURL: (url: string | null) => void;
  addTimelog: (type: TravelTimelogType, timestamp: number) => void;
  getElapsedTime: () => number; // 누적 산행 시간 계산 함수 (밀리초 단위)
  setRemainTimeToStopover: (time: number | null) => void;
  setRemainTimeToEnd: (time: number | null) => void;
  setTravelType: (type: "with-course" | "without-course") => void;
  setTravelData: (data: { mountainId: string; courseId: string }) => void;
  reset: () => void;
}

export const useTravelStateStore = create<TravelStateStore>((set, get) => ({
  travelState: "idle",
  intervalId: null,
  distance: 0,
  traveledPath: [],
  connectedURL: null,
  timelog: [],
  remainTimeToStopover: null,
  remainTimeToEnd: null,
  travelType: null,
  travelData: {},

  setTravelState: (state) => set({ travelState: state }),
  setIntervalId: (id) => set({ intervalId: id }),
  setDistance: (distance) => set({ distance }),
  clearIntervalId: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
      set({ intervalId: null });
    }
  },
  pushTraveledPath: (path) =>
    set((state) => ({
      traveledPath: [...state.traveledPath, path],
    })),
  setConnectedURL: (url) => set({ connectedURL: url }),
  addTimelog: (type, timestamp) =>
    set((state) => ({
      timelog: [...state.timelog, [type, timestamp]],
    })),
  getElapsedTime: () => {
    const { timelog } = useTravelStateStore.getState();

    if (timelog.length === 0) return 0;

    let totalElapsedTime = 0;
    let currentStartTime: number | null = null;

    for (const [type, timestamp] of timelog) {
      switch (type) {
        case "start":
        case "restart":
          currentStartTime = timestamp;
          break;
        case "pause":
          if (currentStartTime !== null) {
            totalElapsedTime += timestamp - currentStartTime;
            currentStartTime = null;
          }
          break;
        case "end":
          if (currentStartTime !== null) {
            totalElapsedTime += timestamp - currentStartTime;
            currentStartTime = null;
          }
          break;
      }
    }

    // 현재 진행 중인 경우 (pause 상태가 아닌 경우)
    if (currentStartTime !== null) {
      totalElapsedTime += Date.now() - currentStartTime;
    }

    return totalElapsedTime;
  },
  setRemainTimeToStopover: (time) => set({ remainTimeToStopover: time }),
  setRemainTimeToEnd: (time) => set({ remainTimeToEnd: time }),
  setTravelType: (type) => set({ travelType: type }),
  setTravelData: (data) => set({ travelData: data }),

  reset: () => {
    set({
      travelState: "idle",
      intervalId: null,
      distance: 0,
      traveledPath: [],
      connectedURL: null,
      timelog: [],
      remainTimeToStopover: null,
      remainTimeToEnd: null,
      travelType: null,
      travelData: {},
    });
  },
}));

export default useTravelStateStore;
