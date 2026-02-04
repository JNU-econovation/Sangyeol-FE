import * as Location from "expo-location";
import { useEffect, useState } from "react";

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface UseReverseGeocodeReturn {
  address: string | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * 좌표를 주소로 변환하는 커스텀 훅
 * @param coordinate - 변환할 좌표 (latitude, longitude)
 * @returns 주소 문자열, 로딩 상태, 에러
 */
export const useReverseGeocode = (
  coordinate: Coordinate | null,
): UseReverseGeocodeReturn => {
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!coordinate) {
      setAddress(null);
      return;
    }

    const fetchAddress = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await Location.reverseGeocodeAsync({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        });

        if (result && result.length > 0) {
          const location = result[0];

          // 한국 주소 형식: "시/도, 대한민국" 또는 "시/군/구, 대한민국"
          const city = location.city || location.district || location.subregion;
          const region = location.region; // 시/도
          const country = location.country || "대한민국";

          // 주소 우선순위: 시 > 구 > 도 > 국가
          if (city && region) {
            setAddress(`${city}, ${country}`);
          } else if (region) {
            setAddress(`${region}, ${country}`);
          } else if (country) {
            setAddress(country);
          } else {
            setAddress("위치 정보 없음");
          }
        } else {
          setAddress("위치 정보 없음");
        }
      } catch (err) {
        console.error("Reverse geocoding failed:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setAddress("위치 정보 없음");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddress();
  }, [coordinate?.latitude, coordinate?.longitude]);

  return { address, isLoading, error };
};
