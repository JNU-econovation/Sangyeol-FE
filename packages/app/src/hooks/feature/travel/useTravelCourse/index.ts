// import useSetMapPolylineBridge from "@hooks/feature/bridge/useSetMapPolylineBridge";
// import useGetCoursePathByCourseId from "@hooks/feature/course/useGetCoursePathByCourseId";
import useRealTimeLocation from "@hooks/feature/location/useRealTimeLocation";
import SocketManager from "@service/socket/manager";
import useToast from "@service/toast";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import useTravelStateStore from "@store/travel";
// import { COLORS } from "@styles/colorPalette";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const TRAVEL_SOCKET_URL = process.env.EXPO_PUBLIC_TRAVEL_NAVIGATE_SOCKET_URL;
const TRAVEL_LOCATION_UPDATE_INTERVAL = 2000;
const TRAVEL_SOCKET_INTERVAL = 12000;

interface UseTravelCourseProps {
  mountainId: string;
  courseId: string;
}
const useTravelCourse = ({ mountainId, courseId }: UseTravelCourseProps) => {
  const socketManager = SocketManager.getInstance();
  const { accessToken } = useTokenStore.getState();
  const {
    intervalId,
    addTimelog,
    setTravelState,
    setIntervalId,
    setDistance,
    pushTraveledPath,
    setConnectedURL,
    setTravelType,
    setRemainTimeToStopover,
    setRemainTimeToEnd,
    setTravelData,
    reset,
  } = useTravelStateStore();
  const showToast = useToast();
  // const coordinates = useGetCoursePathByCourseId({ courseId });
  // const { ref, sendSetMapPolylineMessage } = useSetMapPolylineBridge();
  const { location } = useRealTimeLocation({
    accuracy: "highest",
    timeInterval: TRAVEL_LOCATION_UPDATE_INTERVAL,
    distanceInterval: 1,
  });
  const [shouldStartTravel, setShouldStartTravel] = useState(false);

  useEffect(() => {
    (async () => {
      if (!TRAVEL_SOCKET_URL) {
        console.warn("[useTravelWithCourse] 소켓 URL이 정의되지 않았습니다.");
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
            courseId,
          },
        });
      }
    })();
  }, [location, socketManager, pushTraveledPath]);

  // location이 준비되면 start 메시지 전송
  useEffect(() => {
    (async () => {
      if (!TRAVEL_SOCKET_URL) {
        console.warn("[useTravelCourse] 소켓 URL이 정의되지 않았습니다.");
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
            courseId,
            coordinate: [longitude, latitude],
            time: Date.now(),
          },
        });
        // console.log("[useTravelCourse] start 메시지 전송됨");
        setShouldStartTravel(false);
      }
    })();
  }, [shouldStartTravel, courseId]);

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
        // callback?.();
        setShouldStartTravel(true);
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
      onMessage: ({ event, status, data }) => {
        if (event === "current-position" && status === "success" && data) {
          if (
            typeof data.index === "number" &&
            typeof data.isArrived === "boolean" &&
            typeof data.isDeviation === "boolean" &&
            typeof data.remainTimeToStopover === "number" &&
            typeof data.remainTimeToEnd === "number" &&
            typeof data.travelDistance === "number"
          ) {
            const {
              // index,
              isArrived,
              isDeviation,
              travelDistance,
              remainTimeToStopover,
              remainTimeToEnd,
            } = data;
            setDistance(travelDistance);
            setRemainTimeToStopover(remainTimeToStopover);
            setRemainTimeToEnd(remainTimeToEnd);

            // sendSetMapPolylineMessage([
            //   {
            //     path: coordinates.slice(0, index + 1),
            //     strokeColor: COLORS.gray900,
            //   },
            //   {
            //     path: coordinates.slice(index),
            //     strokeColor: COLORS.green800,
            //   },
            // ]);

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
                      courseId,
                      time: Date.now(),
                    },
                  });
                })
                .then(() => {
                  socketManager.disconnectSocket(TRAVEL_SOCKET_URL);
                })
                .finally(() => {
                  router.replace(`/travel/${mountainId}/${courseId}/result`);
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
                  courseId,
                },
              });
            }
          }, TRAVEL_SOCKET_INTERVAL);
          setIntervalId(newIntervalId);
          setTravelType("with-course");
          setTravelData({ mountainId, courseId });
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
          setTravelState("completed");
          addTimelog("end", Date.now());
          router.replace(`/travel/${mountainId}/${courseId}/result`);
        }
      },
    });
  };

  const disconnect = () => {
    if (!TRAVEL_SOCKET_URL) {
      console.warn("[useTravelCourse] 소켓 URL이 정의되지 않았습니다.");
      return;
    }
    socketManager.disconnectSocket(TRAVEL_SOCKET_URL);
    reset(); //전역 상태 초기화
  };

  return {
    // ref,
    connect,
    disconnect,
  };
};

export default useTravelCourse;
