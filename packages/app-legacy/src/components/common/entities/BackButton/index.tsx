import BackButtonUi from "@shared/ui/BackButtonUi";
import { router } from "expo-router";
import { useCallback } from "react";

interface BackButtonProps {
  background?: boolean;
}

/**
 * BackButton component
 * @param background - 뒤로가기 버튼은 총 2개가 있습니다. 여기서 배경이 있는 버튼인지 아닌지를 구분합니다. (default: false)
 */
const BackButton = ({ background }: BackButtonProps) => {
  const handleBackPress = useCallback(() => {
    router.back();
  }, []);

  return <BackButtonUi onPress={handleBackPress} background={background} />;
};

export default BackButton;
