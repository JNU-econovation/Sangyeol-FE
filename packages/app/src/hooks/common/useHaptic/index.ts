import * as Haptics from "expo-haptics";
import { useCallback } from "react";

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
