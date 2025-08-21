import type { Position } from "@hooks/feature/bridge/useGetCurrentPositionBridge";
import useGetCurrentPositionBridge from "@hooks/feature/bridge/useGetCurrentPositionBridge";
import { useEffect, useState } from "react";

const DEFAULT_POSITION = { latitude: 35.122769, longitude: 126.996822 };

interface UseGetCurrentPosition {
  defaultCurrentPointPosition?: { latitude: number; longitude: number };
  interval?: number;
}

const useGetCurrentPosition = ({
  defaultCurrentPointPosition = DEFAULT_POSITION,
  interval = 5000,
}: UseGetCurrentPosition) => {
  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
  }>(defaultCurrentPointPosition);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentPosition = useGetCurrentPositionBridge();

  const onResponse = ({ coords }: Position) => {
    const { latitude, longitude } = coords;
    setCurrentPosition({ latitude, longitude });
    setIsLoading(false);
    return { latitude, longitude };
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCurrentPosition(onResponse);
    }, interval);
    return () => clearInterval(intervalId);
    // 무한 루프 방지를 위해 빈 배열을 의존성으로 설정합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentPosition]);

  return { currentPosition, isLoading };
};

export default useGetCurrentPosition;
