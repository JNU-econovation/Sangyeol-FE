import * as Location from "expo-location";
import { useEffect, useState, useRef } from "react";

/**
 * 위치 추적의 정확도 수준을 정의합니다.
 * @typedef {string} LocationAccuracy
 * @enum {string}
 */
export type LocationAccuracy =
  | "lowest"
  | "low"
  | "balanced"
  | "high"
  | "highest";

/**
 * useRealTimeLocation 훅의 옵션을 정의합니다.
 * @interface UseRealTimeLocationOptions
 */
export interface UseRealTimeLocationOptions {
  /**
   * 위치 정확도 수준
   * @type {LocationAccuracy}
   * @default "high"
   */
  accuracy?: LocationAccuracy;
  /**
   * 위치 업데이트 시간 간격 (밀리초)
   * @type {number}
   * @default 1000
   */
  timeInterval?: number;
  /**
   * 위치 업데이트 거리 간격 (미터)
   * @type {number}
   * @default 1
   */
  distanceInterval?: number;
}

/**
 * 문자열 형태의 정확도 수준을 expo-location의 LocationAccuracy로 매핑합니다.
 * @type {Record<LocationAccuracy, Location.LocationAccuracy>}
 * @constant
 */
export const ACCURACY_MAP: Record<LocationAccuracy, Location.LocationAccuracy> =
  {
    lowest: Location.LocationAccuracy.Lowest,
    low: Location.LocationAccuracy.Low,
    balanced: Location.LocationAccuracy.Balanced,
    high: Location.LocationAccuracy.High,
    highest: Location.LocationAccuracy.Highest,
  };

/**
 * 실시간으로 기기의 위치 정보를 추적하는 React 훅입니다.
 *
 * 컴포넌트가 마운트될 때 위치 추적을 자동으로 시작하고,
 * 언마운트될 때 위치 추적을 중지합니다.
 * 사용자의 위치 권한 허가가 필요하며, 권한이 없으면 에러 메시지를 반환합니다.
 *
 * @param {UseRealTimeLocationOptions} [options={}] - 위치 추적 옵션
 * @param {LocationAccuracy} [options.accuracy="high"] - 위치 정확도 수준
 * @param {number} [options.timeInterval=1000] - 위치 업데이트 시간 간격 (밀리초)
 * @param {number} [options.distanceInterval=1] - 위치 업데이트 거리 간격 (미터)
 *
 * @returns {Object} 위치 추적 상태 및 제어 함수
 * @returns {Location.LocationObject|null} location - 현재 위치 정보 (초기값: null)
 * @returns {boolean} isLoading - 위치 권한 확인 및 초기 위치 로드 중 여부
 * @returns {string|null} errorMsg - 에러 메시지 (성공 시: null)
 * @returns {boolean} isWatching - 현재 위치 추적 중 여부
 * @returns {Function} startWatching - 위치 추적을 시작하는 비동기 함수
 * @returns {Function} stopWatching - 위치 추적을 중지하는 동기 함수
 *
 * @example
 * const { location, isLoading, errorMsg, startWatching, stopWatching } = useRealTimeLocation({
 *   accuracy: "high",
 *   timeInterval: 1000,
 *   distanceInterval: 1
 * });
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

  /**
   * 위치 추적을 시작합니다.
   *
   * 사용자의 위치 권한을 요청하고, 권한이 허가되면 위치 추적을 시작합니다.
   * 성공 시 isWatching을 true로 설정하고, 실패 시 errorMsg에 메시지를 설정합니다.
   *
   * @async
   * @function startWatching
   * @returns {Promise<void>}
   * @throws {Error} 권한 요청 또는 위치 추적 시작 실패 시 콘솔에 에러 로그 출력
   *
   * @example
   * await startWatching();
   */
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

  /**
   * 위치 추적을 중지합니다.
   *
   * Location.watchPositionAsync의 구독을 제거하고,
   * isWatching 상태를 false로 설정합니다.
   * 이미 추적 중이지 않으면 아무 작업도 수행하지 않습니다.
   *
   * @function stopWatching
   * @returns {void}
   *
   * @example
   * stopWatching();
   */
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

  /**
   * 위치 추적 상태 및 제어 함수를 반환합니다.
   * @typedef {Object} UseRealTimeLocationReturn
   * @property {Location.LocationObject|null} location - 현재 위치 정보
   * @property {boolean} isLoading - 위치 권한 확인 및 초기 위치 로드 중 여부
   * @property {string|null} errorMsg - 에러 메시지
   * @property {boolean} isWatching - 현재 위치 추적 중 여부
   * @property {Function} startWatching - 위치 추적을 시작하는 비동기 함수
   * @property {Function} stopWatching - 위치 추적을 중지하는 동기 함수
   */
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
