import styled from "@emotion/native";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";
import { COLOR_PALETTE } from "@shared/constants/colors";

export default function HomeScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
      router.replace("/(tab)/home");
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <BackgroundView />;
}

const BackgroundView = styled.View`
  flex: 1;
  background-color: ${COLOR_PALETTE.primarySoft};
`;
