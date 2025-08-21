import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { getValueFromSecureStore } from "@utils/secureStore";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen } from "expo-router";
import { useCallback, useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const { accessToken, setAccessToken, setRefreshToken } = useTokenStore();
  const [loaded, error] = useFonts({
    "pretendard-black": require("@/assets/fonts/Pretendard-Black.otf"),
    "pretendard-bold": require("@/assets/fonts/Pretendard-Bold.otf"),
    "pretendard-extrabold": require("@/assets/fonts/Pretendard-ExtraBold.otf"),
    "pretendard-extralight": require("@/assets/fonts/Pretendard-ExtraLight.otf"),
    "pretendard-light": require("@/assets/fonts/Pretendard-Light.otf"),
    "pretendard-medium": require("@/assets/fonts/Pretendard-Medium.otf"),
    "pretendard-regular": require("@/assets/fonts/Pretendard-Regular.otf"),
    "pretendard-semibold": require("@/assets/fonts/Pretendard-SemiBold.otf"),
    "pretendard-thin": require("@/assets/fonts/Pretendard-Thin.otf"),
  });

  const checkLogin = useCallback(async () => {
    try {
      const accessToken = await getValueFromSecureStore("accessToken");
      const refreshToken = await getValueFromSecureStore("refreshToken");

      if (accessToken && refreshToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
      }
    } catch (error) {
      console.error("[global index] Error checking login status:", error);
    }
  }, []);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;
  // if (accessToken) return <Redirect href="/(tabs)/home" />;
  // return <Redirect href={"/starter"} />;
  //TODO: 테스트를 위한 코드
  if (accessToken) return <Redirect href="/onboarding/profile" />;
  return <Redirect href="/onboarding/profile" />;
}
