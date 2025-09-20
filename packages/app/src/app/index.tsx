import useUserProfileStatusQuery from "@hooks/feature/query/query/useUserProfileStatusQuery";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { getValueFromSecureStore } from "@utils/secureStore";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen } from "expo-router";
import { useCallback, useEffect } from "react";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function Index() {
  const { accessToken, setAccessToken, setRefreshToken } = useTokenStore();
  const {
    data: profileStatus,
    isLoading: profileStatusLoading,
    error: profileStatusError,
  } = useUserProfileStatusQuery();
  const [fontLoaded, fontError] = useFonts({
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
    if (fontLoaded || fontError) SplashScreen.hideAsync();
  }, [fontLoaded, fontError]);

  if (profileStatusLoading || !profileStatus) return null; //TODO: 로딩 폴백 보여주기

  const { isComplete } = profileStatus;

  console.log("isComplete", isComplete);
  if (accessToken && isComplete === false)
    return <Redirect href="/onboarding/profile" />;

  if (fontError || profileStatusError) return null; //TODO: 에러 페이지로 넘기기
  if (accessToken) return <Redirect href="/(tabs)/home" />;
  return <Redirect href={"/starter"} />;
}
