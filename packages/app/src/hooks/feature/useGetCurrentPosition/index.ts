import * as Location from "expo-location";
import { useEffect, useState } from "react";

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
