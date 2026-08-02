import useTravelPathLogMigration from "@db/hooks/migration/travelPathLogMigration";
import useCheckUserLoginAndProfileState from "@hooks/feature/authenticate/useCheckUserLoginAndProfileState";
import useLogout from "@hooks/feature/authenticate/useLogout";
import useSetTokenToStoreState from "@hooks/feature/authenticate/useSetTokenToStoreState";
import usePretendardFont from "@hooks/feature/font/usePretendardFont";
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
  const {
    accessToken,
    error: profileStatusError,
    isCheckingLoginLoading,
    profileStatusLoading,
    isLoggedIn,
    isBasicInfoSet,
    isLoading: isLoginAndProfileStateLoading,
  } = useCheckUserLoginAndProfileState();
  const { logout } = useLogout();
  const { isLoading: isSetTokenToStoreLoading } = useSetTokenToStoreState();
  const [fontLoaded, fontError] = usePretendardFont();
  const { dbReady } = useTravelPathLogMigration();

  useEffect(() => {
    if (
      fontLoaded &&
      !isLoginAndProfileStateLoading &&
      !isSetTokenToStoreLoading &&
      dbReady
    )
      SplashScreen.hideAsync();
  }, [fontLoaded, isLoginAndProfileStateLoading, isSetTokenToStoreLoading]);

  if (isCheckingLoginLoading || profileStatusLoading) return null; //TODO: 로딩 폴백 보여주기

  if (fontError || profileStatusError) {
    (async () => {
      console.warn(
        "[global index] Font loading error or profile status api error:",
      );
      await SplashScreen.hideAsync();

      logout();
    })();
    return <Redirect href={"/starter"} />;
  }

  if (isLoggedIn && !isBasicInfoSet)
    return <Redirect href="/onboarding/terms" />;

  if (accessToken) return <Redirect href="/(tabs)/home" />;
  return <Redirect href={"/starter"} />;
}
