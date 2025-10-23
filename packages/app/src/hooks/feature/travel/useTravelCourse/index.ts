import useRealTimeLocation from "@hooks/feature/location/useRealTimeLocation";
import useDeviationToast from "@hooks/feature/toast/travel/useDeviationToast";
import useTravelEndToast from "@hooks/feature/toast/travel/useTravelEndToast";
import SocketManager from "@service/socket/manager";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import useTravelStateStore from "@store/travel";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useRef } from "react";

import { AppState } from "react-native";
import SOCKET from "./constants";
import { SocketMessageResponse } from "./types";

const TRAVEL_SOCKET_URL = process.env.EXPO_PUBLIC_TRAVEL_NAVIGATE_SOCKET_URL;
const TRAVEL_LOCATION_UPDATE_INTERVAL = 2000;
const KEEP_ALIVE_INTERVAL = 10000;

interface UseTravelCourseProps {
  mountainId: string;
  courseId: string;
}

const useTravelCourse = ({ mountainId, courseId }: UseTravelCourseProps) => {
  "use memo";
  const appState = useRef(AppState.currentState);
  const socketManager = SocketManager.getInstance();
  const { accessToken } = useTokenStore.getState();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const {
    travelState,
    setTravelState,
    setDistance,
    addTimelog, // (type: 'start' | 'pause' | 'restart' | 'end', time: number) => void. 여행 타임로그 추가 함수. 이는 올바른 시간 계산을 위하여 로그를 스택으로 남기는 함수이다.
    pushTraveledPath,
    getElapsedTime,
    setTravelType,
    setConnectedURL,
    setRemainTimeToEnd,
    setRemainTimeToStopover,
    reset,
  } = useTravelStateStore();
  const { location } = useRealTimeLocation({
    accuracy: "highest",
    timeInterval: TRAVEL_LOCATION_UPDATE_INTERVAL,
    distanceInterval: 1,
  });
  const { showDeviationToast } = useDeviationToast();
  const { showTravelEndToast } = useTravelEndToast();

  // init
  useEffect(() => {
    setTravelType("with-course");
  }, [setTravelType]);

  const onMessage = async ({ event, status, data }: SocketMessageResponse) => {
    // console.log("소캣 메시지 수신:", { event, status, data });

    if (status === "error") return console.error("에러 발생");

    if (event === "start") {
      // 산행 시작 상태로 바꾸기
      setTravelState("in-progress");
      addTimelog("start", Date.now());
    }

    if (event === "current-position") {
      const {
        isArrived,
        isDeviation,
        travelDistance,
        remainTimeToEnd,
        remainTimeToStopover,
        // index,
      } = data;
      setDistance(travelDistance);
      setRemainTimeToEnd(remainTimeToEnd);
      setRemainTimeToStopover(remainTimeToStopover);

      // 경로 이탈한 경우
      if (isDeviation) showDeviationToast();

      // 도착한 경우
      if (isArrived) {
        // 설정 상태 초기화
        setTravelState("completed");
        addTimelog("end", Date.now());
        // clearIntervalId();

        showTravelEndToast();

        const {
          coords: { longitude, latitude },
        } = location;

        socketManager
          .getSocket(TRAVEL_SOCKET_URL)
          ?.sendMessage(
            SOCKET.MESSAGE.END(
              [longitude, latitude],
              getElapsedTime(),
              courseId,
            ),
          );

        // 1.5초 뒤에 소켓 연결 종료
        // 3초 뒤에 이전 화면으로 이동
        setTimeout(() => {
          socketManager.disconnectSocket(TRAVEL_SOCKET_URL);
          setTravelState("completed");
        }, 1500);

        setTimeout(() => {
          router.replace(`/travel/${mountainId}/${courseId}/result`);
        }, 3000);
      }
    }

    if (event === "pause") {
      console.log("[useTravelCourse] 여행 일시 정지:", data);
      setTravelState("paused");
      addTimelog("pause", Date.now());
    }

    if (event === "restart") {
      console.log("[useTravelCourse] 여행 재시작:", data);
      setTravelState("in-progress");
      addTimelog("restart", Date.now());
    }

    if (event === "end") {
      console.log("[useTravelCourse] 여행 끝:", data);
      setTravelState("completed");

      addTimelog("end", Date.now());

      // 서버 응답 후 안전하게 소켓 연결 해제
      setTimeout(() => {
        socketManager.disconnectSocket(TRAVEL_SOCKET_URL);
        setTravelState("completed");
      }, 500);

      router.replace(`/travel/${mountainId}/${courseId}/result`);
    }
  };

  const connect = () => {
    if (!TRAVEL_SOCKET_URL)
      return console.warn(
        "[useTravelCourse_start] 소켓 URL이 정의되지 않았습니다.",
      );
    if (!accessToken)
      return console.warn(
        "[useTravelCourse_start] 토큰이 정의되지 않았습니다.",
      );

    socketManager.makeNewConnection({
      url: TRAVEL_SOCKET_URL,
      token: accessToken,
      onOpen: () => {
        console.log("[useTravelCourse] 소켓 연결 성공");
        // setShouldStartTravel(true);
        setConnectedURL(TRAVEL_SOCKET_URL);
      },
      onClose: () => {
        console.warn("[useTravelCourse] 소켓 연결이 종료되었습니다.");
        setTravelState("idle");
        setConnectedURL(null);
      },
      onError: (error) => {
        console.error("[useTravelCourse] 소켓 연결 오류:", error);
        setTravelState("idle");
        setConnectedURL(null);
        reset();
      },
      onMessage,
    });
  };

  const start = async () => {
    // [!info] location이 준비되지 않은 상태일 수 있어서 함수 내부에서 다시 가져옴

    const socket = socketManager.getSocket(TRAVEL_SOCKET_URL);
    if (!socket)
      return console.warn(
        "[useTravelCourse_start] 소켓이 연결되지 않았습니다.",
      );

    if (travelState === "in-progress")
      return console.warn(
        "[useTravelCourse_start] 여행이 이미 시작되었습니다.",
      );

    try {
      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("[useTravelCourse_start] 위치 권한이 거부되었습니다.");
        return;
      }

      // 현재 위치 가져오기
      const {
        coords: { longitude, latitude },
      } = await Location.getCurrentPositionAsync();
      socket.sendMessage(SOCKET.MESSAGE.START([longitude, latitude], courseId));
      console.log("start 메시지 보냄");
    } catch (error) {
      console.error("[useTravelCourse_start] 위치 가져오기 실패:", error);
    }
  };

  // 주기적으로 위치 전송햐는 함수
  const startLocationInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (travelState === "idle" || travelState === "completed") {
      return;
    }

    intervalRef.current = setInterval(() => {
      const socket = socketManager.getSocket(TRAVEL_SOCKET_URL);
      if (!socket) return;
      const {
        coords: { longitude, latitude },
      } = location;
      socket.sendMessage(
        SOCKET.MESSAGE.CURRENT_POSITION([longitude, latitude], courseId),
      );
      if (travelState === "in-progress")
        pushTraveledPath([longitude, latitude]);
    }, KEEP_ALIVE_INTERVAL);
  };

  //  주기적으로 위치 전송 시작 / 중지 관리 훅
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;

      if (nextAppState.match(/inactive|background/)) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      if (nextAppState === "active") {
        startLocationInterval();
      }
    });

    if (appState.current === "active") {
      startLocationInterval();
    }

    return () => {
      subscription.remove();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [travelState]);

  // 위치가 변경될 때마다 위치 전송
  useEffect(() => {
    const socket = socketManager.getSocket(TRAVEL_SOCKET_URL);
    if (!socket) return;
    if (!location) return;
    if (travelState !== "in-progress") return;
    const {
      coords: { longitude, latitude },
    } = location;
    socket.sendMessage(
      SOCKET.MESSAGE.CURRENT_POSITION([longitude, latitude], courseId),
    );
    if (travelState === "in-progress") pushTraveledPath([longitude, latitude]);
  }, [location, travelState]);

  return { connect, start };
};

export default useTravelCourse;
