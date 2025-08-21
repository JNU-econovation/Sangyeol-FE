import * as Location from "expo-location";
import { useEffect, useState, useRef } from "react";

type LocationAccuracy = "lowest" | "low" | "balanced" | "high" | "highest";

interface UseRealTimeLocationOptions {
  accuracy?: LocationAccuracy; // 위치 정확도 수준 (기본값: "high")
  timeInterval?: number; // 위치 업데이트 시간 간격 (밀리초, 기본값: 1000ms)
  distanceInterval?: number; // 위치 업데이트 거리 간격 (미터, 기본값: 1m)
}

const ACCURACY_MAP: Record<LocationAccuracy, Location.LocationAccuracy> = {
  lowest: Location.LocationAccuracy.Lowest,
  low: Location.LocationAccuracy.Low,
  balanced: Location.LocationAccuracy.Balanced,
  high: Location.LocationAccuracy.High,
  highest: Location.LocationAccuracy.Highest,
};

/**
 * 실시간으로 위치 정보를 추적하는 훅입니다.
 * @param options - 위치 추적 옵션
 */
const useRealTimeLocation = (options: UseRealTimeLocationOptions = {}) => {
  const {
    accuracy = "high",
    timeInterval = 1000,
    distanceInterval = 1,
  } = options;

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isWatching, setIsWatching] = useState<boolean>(false);

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  const startWatching = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setIsLoading(false);
        setErrorMsg("위치 서비스 접근 권한이 필요합니다.");
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: ACCURACY_MAP[accuracy],
          timeInterval,
          distanceInterval,
        },
        (newLocation) => {
          setLocation(newLocation);
          setIsLoading(false);
          setErrorMsg(null);
        },
      );

      subscriptionRef.current = subscription;
      setIsWatching(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMsg("위치 추적을 시작할 수 없습니다.");
      console.error(
        "[useRealTimeLocation] Error starting location watch:",
        error,
      );
    }
  };

  const stopWatching = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.remove();
      subscriptionRef.current = null;
      setIsWatching(false);
    }
  };

  useEffect(() => {
    startWatching();

    return () => {
      stopWatching();
    };
  }, [accuracy, timeInterval, distanceInterval]);

  return {
    location,
    isLoading,
    errorMsg,
    isWatching,
    startWatching,
    stopWatching,
  };
};

export default useRealTimeLocation;
