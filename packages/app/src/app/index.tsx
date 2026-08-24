import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";

import SplashSection from "@modules/widgets/splash/SplashSection";

const SPLASH_DURATION_MS = 1200;

export default function SplashPage() {
  useEffect(() => {
    SplashScreen.hideAsync();

    const timer = setTimeout(() => {
      router.replace("/(tab)/home");
    }, SPLASH_DURATION_MS);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <SplashSection />;
}
