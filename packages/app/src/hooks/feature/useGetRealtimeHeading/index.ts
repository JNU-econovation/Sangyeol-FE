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
    Location.watchHeadingAsync((headingData) => {
      setIsLoading(false);
      const currentHeading = headingData.trueHeading || headingData.magHeading;
      targetHeading.value = currentHeading;
    }).then((subscription) => {
      subscriptionRef.current = subscription;
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
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
