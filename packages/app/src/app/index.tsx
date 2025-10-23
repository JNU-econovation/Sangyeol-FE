import useCheckUserLoginAndProfileState from "@hooks/feature/authenticate/useCheckUserLoginAndProfileState";
import useLogout from "@hooks/feature/authenticate/useLogout";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen } from "expo-router";
import { useEffect } from "react";
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
  const { setAccessToken, setRefreshToken } = useTokenStore();
  const {
    accessToken,
    error,
    isCheckingLoginLoading,
    profileStatusLoading,
    isLoggedIn,
    isBasicInfoSet,
    refreshToken,
  } = useCheckUserLoginAndProfileState();
  const { logout } = useLogout();

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

  // 처음 렌더링 될 때, 로그인 상태 확인
  useEffect(() => {
    try {
      // SecureStore에서 토큰 가져와 전역 상태에 설정 (가져오는 로직은 useCheckUserLoginAndProfileState 훅에서 처리)
      if (accessToken && refreshToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
      }
    } catch (error) {
      console.error("[global index] Error checking login status:", error);
    }
  }, [setAccessToken, setRefreshToken, accessToken, refreshToken]);

  // 폰트 로딩 또는 에러 발생 시 스플래시 스크린 숨기기
  useEffect(() => {
    if (fontLoaded || fontError || error) SplashScreen.hideAsync();
  }, [fontLoaded, fontError, error]);

  if (isCheckingLoginLoading || profileStatusLoading) return null; //TODO: 로딩 폴백 보여주기

  if (fontError || error) {
    (async () => {
      console.error(
        "[global index] Font loading error or profile status api error:",
      );
      await SplashScreen.hideAsync();

      logout();
    })();
    return <Redirect href={"/starter"} />;
  }
  if (isLoggedIn && !isBasicInfoSet)
    return <Redirect href="/onboarding/profile" />;

  // if (fontError || error) return <Redirect href="/starter" />;
  if (accessToken) return <Redirect href="/(tabs)/home" />;
  return <Redirect href={"/starter"} />;
}
