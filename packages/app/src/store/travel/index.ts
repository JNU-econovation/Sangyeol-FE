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
  setTravelState: (state: TravelState) => void;
  setIntervalId: (id: number | null) => void;
  setDistance: (distance: number) => void;
  pushTraveledPath: (path: Coordinate) => void;
  setConnectedURL: (url: string | null) => void;
  addTimelog: (type: TravelTimelogType, timestamp: number) => void;
  getElapsedTime: () => number;
  reset: () => void;
}

const useTravelStateStore = create<TravelStateStore>((set) => ({
  travelState: "idle",
  intervalId: null,
  distance: 0,
  traveledPath: [],
  connectedURL: null,
  timelog: [],
  setTravelState: (state) => set({ travelState: state }),
  setIntervalId: (id) => set({ intervalId: id }),
  setDistance: (distance) => set({ distance }),
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
  reset: () => {
    set({
      travelState: "idle",
      intervalId: null,
      distance: 0,
      traveledPath: [],
      connectedURL: null,
      timelog: [],
    });
  },
}));

export default useTravelStateStore;
