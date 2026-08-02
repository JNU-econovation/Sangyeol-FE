import useLogout from "@hooks/feature/authenticate/useLogout";
import BackButtonUi from "@shared/ui/BackButtonUi";
import { router } from "expo-router";
import { useCallback } from "react";

const LogoutWithBackButton = () => {
  const { logout } = useLogout();

  const handleBackPress = useCallback(() => {
    logout().then(() => {
      router.replace("/");
    });
  }, [logout]);

  return <BackButtonUi onPress={handleBackPress} />;
};

export default LogoutWithBackButton;
