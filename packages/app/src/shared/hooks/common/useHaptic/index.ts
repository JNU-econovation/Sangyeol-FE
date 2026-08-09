import * as Haptics from "expo-haptics";
import { useCallback } from "react";

/**
 * 햅틱 피드백을 제공하는 훅
 */
const useHaptics = () => {
  const selectFeedback = useCallback(() => {
    Haptics.selectionAsync();
  }, []);

  const defaultFeedback = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  return {
    selectFeedback,
    defaultFeedback,
  };
};

export default useHaptics;
