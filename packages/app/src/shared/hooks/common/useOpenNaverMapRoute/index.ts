import { getNaverMapWalkRouteUrl } from "@shared/utils/naverMap";
import * as Linking from "expo-linking";
import { useCallback } from "react";
import { Platform } from "react-native";

const APP_NAME = "com.sangyeol.sangyeol";

const NAVER_MAP_STORE_URL = Platform.select({
  ios: "https://apps.apple.com/app/id311867728",
  default: "market://details?id=com.nhn.android.nmap",
});

/**
 * 네이버 지도 앱을 열어 도보 길찾기를 실행하는 훅
 * 네이버 지도 앱이 설치되어 있지 않으면 스토어로 이동합니다.
 */
const useOpenNaverMapRoute = () => {
  const openNaverMapRoute = useCallback(
    async ({
      dlat,
      dlng,
      dname,
    }: {
      dlat: number;
      dlng: number;
      dname: string;
    }) => {
      try {
        await Linking.openURL(
          getNaverMapWalkRouteUrl({ dlat, dlng, dname, appName: APP_NAME }),
        );
      } catch {
        try {
          await Linking.openURL(NAVER_MAP_STORE_URL);
        } catch (error) {
          console.warn("[useOpenNaverMapRoute] 스토어 열기 실패", error);
        }
      }
    },
    [],
  );

  return { openNaverMapRoute };
};

export default useOpenNaverMapRoute;
