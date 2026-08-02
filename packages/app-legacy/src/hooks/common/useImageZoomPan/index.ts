import { Gesture } from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface UseImageZoomPanOptions {
  minScale?: number;
  maxScale?: number;
  boundaryWidth?: number;
  boundaryHeight?: number;
}

export const useImageZoomPan = ({
  minScale = 0.5,
  maxScale = 3,
  boundaryWidth = 0,
  boundaryHeight = 0,
}: UseImageZoomPanOptions = {}) => {
  // Shared values
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // 경계 제한 함수
  const clamp = (value: number, min: number, max: number) => {
    "worklet";
    return Math.min(Math.max(value, min), max);
  };

  const calculateBoundary = (currentScale: number) => {
    "worklet";
    const maxTranslateX = (boundaryWidth * (currentScale - 1)) / 2;
    const maxTranslateY = (boundaryHeight * (currentScale - 1)) / 2;
    return { maxTranslateX, maxTranslateY };
  };

  // Pinch 제스처 (확대/축소)
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      const newScale = savedScale.value * event.scale;
      scale.value = clamp(newScale, minScale, maxScale);
    })
    .onEnd(() => {
      savedScale.value = scale.value;

      // 스케일 변경 시 경계 재조정
      const { maxTranslateX, maxTranslateY } = calculateBoundary(scale.value);
      translateX.value = clamp(
        translateX.value,
        -maxTranslateX,
        maxTranslateX,
      );
      translateY.value = clamp(
        translateY.value,
        -maxTranslateY,
        maxTranslateY,
      );
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // Pan 제스처 (이동)
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const { maxTranslateX, maxTranslateY } = calculateBoundary(scale.value);

      translateX.value = clamp(
        savedTranslateX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX,
      );
      translateY.value = clamp(
        savedTranslateY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY,
      );
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // 두 제스처 동시 작동 가능
  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return {
    animatedStyle,
    gesture: composedGesture,
    scale,
    translateX,
    translateY,
  };
};
