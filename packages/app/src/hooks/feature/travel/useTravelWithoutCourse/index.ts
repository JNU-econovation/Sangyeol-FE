// import useSetMapPolylineBridge from "@hooks/feature/bridge/useSetMapPolylineBridge";
import useRealTimeLocation from "@hooks/feature/location/useRealTimeLocation";
import SocketManager from "@service/socket/manager";
import useToast from "@service/toast";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import useTravelStateStore from "@store/travel";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const TRAVEL_SOCKET_URL = process.env.EXPO_PUBLIC_TRAVEL_SOCKET_URL;
const TRAVEL_LOCATION_UPDATE_INTERVAL = 2000;
const TRAVEL_SOCKET_INTERVAL = 12000;

// TODO: 최적화 필요. | 잠깐 백그라운드에 있다가 오면 몇 초 이상 멈춰있음. 추가적으로 백그라운드에서 상태를 관리하는 로직이 올바르게 동작하지 않을 수 있음. sqlite 도입 고려 필요

const useTravelWithoutCourse = () => {
  const socketManager = SocketManager.getInstance();
  const { accessToken } = useTokenStore.getState();
  const {
    setTravelState,
    setDistance,
    intervalId,
    addTimelog, // (type: 'start' | 'pause' | 'restart' | 'end', time: number) => void. 여행 타임로그 추가 함수. 이는 올바른 시간 계산을 위하여 로그를 스택으로 남기는 함수이다.
    setIntervalId,
    clearIntervalId,
    pushTraveledPath,
    traveledPath,
    setConnectedURL,
    reset,
  } = useTravelStateStore();
  const showToast = useToast();
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
        console.log("[useTravelWithoutCourse] 위치 변경:");
        socket.sendMessage({
          event: "current-position",
          data: {
            coordinate: [longitude, latitude],
          },
        });
      }
    })();
  }, [location, socketManager, pushTraveledPath]);

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
      // 현재 위지를 단발성으로 가져와서
      let { latitude, longitude } = (await Location.getCurrentPositionAsync({}))
        .coords;
      // traveledPath에 추가 (traveledPath는 사용자의 위치를 배열로 저장하고, 이를 화면에 그린다.)
      pushTraveledPath([longitude, latitude]);
      // 서버로 start 메시지 전송
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

  // 소켓 연결 및 메시지 처리 함수
  const connect = () => {
    if (!TRAVEL_SOCKET_URL) {
      console.warn("[useTravelCourse] 소켓 URL이 정의되지 않았습니다.");
      return;
    }
    if (!accessToken) {
      console.warn("[useTravelCourse] 토큰이 정의되지 않았습니다.");
      return;
    }

    // 새로운 소켓 연결 생성
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
      },
      onError: (error) => {
        console.error("[useTravelCourse] 소켓 연결 오류:", error);
        setTravelState("idle");
        setConnectedURL(null);
        reset();
      },
      onMessage: ({ event, status, data }) => {
        // console.log("소캣 메시지 수신:", { event, status, data });
        if (event === "current-position" && status === "success" && data) {
          // console.log("[useTravelCourse] 현재 위치:", data);

          if (
            typeof data.index === "number" &&
            typeof data.isArrived === "boolean" &&
            typeof data.isDeviation === "boolean"
          ) {
            const { isArrived, isDeviation, travelDistance } = data;
            setDistance(travelDistance);

            // traveledPath를 폴리라인으로 그리기 (웹뷰인 경우에만 동작)
            // sendSetMapPolylineMessage([
            //   {
            //     path: traveledPath,
            //     strokeColor: COLORS.gray900,
            //   },
            // ]);

            // 만약 도착 완료 상태라면
            if (isArrived) {
              // 설정값들 초기화(종료 시 상태로 변경)
              setTravelState("completed");
              addTimelog("end", Date.now());
              showToast({
                type: "success",
                text1: "여행이 완료되었습니다.",
                text2: "즐거운 여행 되세요!",
              });

              // 반복해서 웹소켓으로 위치 전송하는 인터벌 제거
              clearIntervalId();

              // 종료
              Location.getCurrentPositionAsync({}) // 현재 위치를 다시 한 번 받아서
                .then(({ coords: { longitude, latitude } }) => {
                  // 서버로 end 메시지 전송
                  socketManager.getSocket(TRAVEL_SOCKET_URL)?.sendMessage({
                    event: "end",
                    data: {
                      coordinate: [longitude, latitude],
                      time: Date.now(),
                    },
                  });
                })
                .then(() => {
                  // 1.5초 뒤에 소켓 연결 종료
                  // 3초 뒤에 이전 화면으로 이동
                  setTimeout(() => {
                    socketManager.disconnectSocket(TRAVEL_SOCKET_URL);
                    setTravelState("completed");
                  }, 1500);

                  setTimeout(() => {
                    router.replace("/travel/withoutCourse/result");
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
        // 여행 시작 요청에 대한 응답 처리
        if (event === "start" && status === "success" && data) {
          // console.log("[useTravelCourse] 여행 시작:", data);
          setTravelState("in-progress");
          // addTimelog("start", Date.now());
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
          if (intervalId) clearIntervalId();
          setTravelState("completed");

          addTimelog("end", Date.now());

          // 서버 응답 후 안전하게 소켓 연결 해제
          setTimeout(() => {
            socketManager.disconnectSocket(TRAVEL_SOCKET_URL);
            setTravelState("completed");
          }, 500);

          router.replace("/travel/withoutCourse/result");
        }
      },
    });
  };

  const disconnect = () => {
    if (!TRAVEL_SOCKET_URL) {
      console.warn("[useTravelCourse] 소켓 URL이 정의되지 않았습니다.");
      return;
    }
    // reset();
  };

  return {
    // ref,
    connect,
    disconnect,
  };
};

export default useTravelWithoutCourse;
