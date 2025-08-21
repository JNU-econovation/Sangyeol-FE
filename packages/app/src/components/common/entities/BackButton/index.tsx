import BackButtonUi from "@components/common/shared/ui/BackButtonUi";
import { router } from "expo-router";
import { useCallback } from "react";

const BackButton = () => {
  const handleBackPress = useCallback(() => {
    router.back();
  }, []);

  return <BackButtonUi onPress={handleBackPress} />;
};

export default BackButton;
