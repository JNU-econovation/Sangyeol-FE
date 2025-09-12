import * as Location from "expo-location";
import { useEffect, useState } from "react";

/**
 * 현재 위치를 가져오는 훅입니다.
 * 호출 시 위치 권한을 요청하고, 허용되면 현재 위치를 1회 가져옵니다.
 * 만약 주기적인 위치 업데이트가 필요하다면, useRealTimeLocation 훅을 사용하세요.
 */
const useGetCurrentPosition = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setIsLoading(false);
        setErrorMsg("위치 서비스 접근 권한이 필요합니다.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setIsLoading(false);
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  return {
    location,
    isLoading,
    errorMsg,
  };
};

export default useGetCurrentPosition;
