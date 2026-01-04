import PositionBottom from "@shared/layout/PositionBottom";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { router } from "expo-router";

interface TermSubmitButtonProps {
  disabled?: boolean;
}

const TermSubmitButton = ({ disabled }: TermSubmitButtonProps) => {
  const handlePress = () => {
    router.push("/onboarding/profile");
  };
  return (
    <PositionBottom>
      <DefaultButton
        title="확인"
        onPress={handlePress}
        fullWidth
        disabled={disabled}
      />
    </PositionBottom>
  );
};

export default TermSubmitButton;
