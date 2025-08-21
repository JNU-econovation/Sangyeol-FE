import useSetMapPolylineBridge from "@hooks/feature/bridge/useSetMapPolylineBridge";
import SocketManager from "@service/socket/manager";
import useToast from "@service/toast";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const TRAVEL_SOCKET_URL = process.env.EXPO_PUBLIC_TRAVEL_SOCKET_URL;
const TRAVEL_SOCKET_INTERVAL = 12000;

const useTravelWithoutCourse = () => {
  const socketManager = SocketManager.getInstance();
  const { accessToken } = useTokenStore.getState();
  const {
    setTravelState,
    setDistance,
    intervalId,
    addTimelog,
    setIntervalId,
    pushTraveledPath,
    traveledPath,
    setConnectedURL,
    reset,
  } = useTravelStateStore();
  const showToast = useToast();
  const { ref, sendSetMapPolylineMessage } = useSetMapPolylineBridge();
  const [shouldStartTravel, setShouldStartTravel] = useState(false);

  // location이 준비되면 start 메시지 전송
  useEffect(() => {
    (async () => {
      if (!TRAVEL_SOCKET_URL) {
        console.warn(
          "[useTravelWithoutCourse] 소켓 URL이 정의되지 않았습니다.",
        );
        return;
      }
      const socket = socketManager.getSocket(TRAVEL_SOCKET_URL);
      let { latitude, longitude } = (await Location.getCurrentPositionAsync({}))
        .coords;
      pushTraveledPath([longitude, latitude]);
      if (socket && shouldStartTravel) {
        socket.sendMessage({
          event: "start",
          data: {
            coordinate: [longitude, latitude],
            time: Date.now(),
          },
        });
        setShouldStartTravel(false);
      }
    })();
  }, [shouldStartTravel]);

  const connect = () => {
    if (!TRAVEL_SOCKET_URL) {
      console.warn("[useTravelCourse] 소켓 URL이 정의되지 않았습니다.");
      return;
    }
    if (!accessToken) {
      console.warn("[useTravelCourse] 토큰이 정의되지 않았습니다.");
      return;
    }

    socketManager.makeNewConnection({
      url: TRAVEL_SOCKET_URL,
      token: accessToken,
      onOpen: () => {
        console.log("[useTravelCourse] 소켓 연결 성공");
        setShouldStartTravel(true);
        setConnectedURL(TRAVEL_SOCKET_URL);
      },
      onClose: () => {
        console.warn("[useTravelCourse] 소켓 연결이 종료되었습니다.");
        setTravelState("idle");
        setConnectedURL(null);
        reset();
      },
      onError: (error) => {
        console.error("[useTravelCourse] 소켓 연결 오류:", error);
        setTravelState("idle");
        setConnectedURL(null);
        reset();
      },
      onMessage: ({ event, status, data }) => {
        console.log("소캣 메시지 수신:", { event, status, data });
        if (event === "current-position" && status === "success" && data) {
          // console.log("[useTravelCourse] 현재 위치:", data);

          if (
            typeof data.index === "number" &&
            typeof data.isArrived === "boolean" &&
            typeof data.isDeviation === "boolean"
          ) {
            const { index, isArrived, isDeviation, travelDistance } = data;
            // console.log("[useTravelWithCourse] 서버로부터 받은 데이터:", data);
            setDistance(travelDistance);

            sendSetMapPolylineMessage([
              {
                path: traveledPath,
                strokeColor: COLORS.gray20,
              },
            ]);

            if (isArrived) {
              setTravelState("completed");
              addTimelog("end", Date.now());
              showToast({
                type: "success",
                text1: "여행이 완료되었습니다.",
                text2: "즐거운 여행 되세요!",
              });

              if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
              }

              // 종료
              Location.getCurrentPositionAsync({})
                .then(({ coords: { longitude, latitude } }) => {
                  socketManager.getSocket(TRAVEL_SOCKET_URL)?.sendMessage({
                    event: "end",
                    data: {
                      coordinate: [longitude, latitude],
                      time: Date.now(),
                    },
                  });
                })
                .then(() => {
                  setTimeout(() => {
                    socketManager.disconnectSocket(TRAVEL_SOCKET_URL);
                    setTravelState("idle");
                  }, 1500);

                  setTimeout(() => {
                    router.back();
                  }, 3000);
                });
            }

            if (isDeviation) {
              showToast({
                type: "error",
                text1: "경로 이탈 감지",
                text2: "정해진 경로를 벗어났습니다.",
              });
            }
          }
        }
        if (event === "start" && status === "success" && data) {
          // console.log("[useTravelCourse] 여행 시작:", data);
          setTravelState("in-progress");
          addTimelog("start", Date.now());
          if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
          }
          const newIntervalId = setInterval(async () => {
            if (!TRAVEL_SOCKET_URL) {
              console.warn(
                "[useTravelWithCourse] 소켓 URL이 정의되지 않았습니다.",
              );
              return;
            }
            let socket = socketManager.getSocket(TRAVEL_SOCKET_URL);
            if (socket) {
              let { latitude, longitude } = (
                await Location.getCurrentPositionAsync({})
              ).coords;
              pushTraveledPath([longitude, latitude]);
              socket.sendMessage({
                event: "current-position",
                data: {
                  coordinate: [longitude, latitude],
                },
              });
            }
          }, TRAVEL_SOCKET_INTERVAL);
          setIntervalId(newIntervalId);
        }
        if (event === "pause" && status === "success" && data) {
          console.log("[useTravelCourse] 여행 일시 정지:", data);
          setTravelState("paused");
          addTimelog("pause", Date.now());
        }
        if (event === "restart" && status === "success" && data) {
          console.log("[useTravelCourse] 여행 재시작:", data);
          setTravelState("in-progress");
          addTimelog("restart", Date.now());
        }
        if (event === "end" && status === "success" && data) {
          console.log("[useTravelCourse] 여행 끝:", data);
          socketManager.disconnectSocket(TRAVEL_SOCKET_URL);
          if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
          }
          // setTravelState("completed");
          addTimelog("end", Date.now());
          router.replace("/");
        }
      },
    });
  };

  const disconnect = () => {
    if (!TRAVEL_SOCKET_URL) {
      console.warn("[useTravelCourse] 소켓 URL이 정의되지 않았습니다.");
      return;
    }
    reset();
  };

  return {
    ref,
    connect,
    disconnect,
  };
};

export default useTravelWithoutCourse;
