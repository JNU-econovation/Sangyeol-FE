import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";

const ANIMATION_INTERVAL = 16; // ~60fps for smooth animation

const useGetRealtimeHeading = () => {
  const animationRef = useRef(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const [heading, setHeading] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const targetHeading = useSharedValue(0);

  useEffect(() => {
    (async () => {
      try {
        const { status: foregroundPermissionStatus } =
          await Location.requestForegroundPermissionsAsync();
        const { status: backgroundPermissionStatus } =
          await Location.requestBackgroundPermissionsAsync();

        if (foregroundPermissionStatus !== "granted") {
          console.warn(
            "[useGetRealtimeHeading] 위치 서비스 접근 권한이 필요합니다.",
          );
          return;
        }
        if (backgroundPermissionStatus !== "granted") {
          console.warn(
            "[useGetRealtimeHeading] 백그라운드 위치 권한이 허용되지 않았습니다.",
          );
        }
        const sub = await Location.watchHeadingAsync((headingData) => {
          setIsLoading(false);
          const currentHeading =
            headingData.trueHeading ?? headingData.magHeading ?? 0;
          targetHeading.value = currentHeading;
        });
        subscriptionRef.current = sub;
      } catch (e) {
        console.warn("[useGetRealtimeHeading] watchHeadingAsync failed:", e);
      }
    })();
  }, []);

  // 부드러운 애니메이션 (60fps)
  useEffect(() => {
    animationRef.current = setInterval(() => {
      setHeading(() => {
        return targetHeading.value;
      });
    }, ANIMATION_INTERVAL);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  return { heading, isLoading };
};

export default useGetRealtimeHeading;
