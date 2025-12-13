import PATH_ROUTE from "@constants/pathRoute";
import { router } from "expo-router";
import { useCallback } from "react";

const useRouteHandler = () => {
  const goToMyInfo = useCallback(() => {
    router.push({
      pathname: "/(tabs)/mypage/webview/[url]",
      params: {
        url: PATH_ROUTE.WEBVIEW.MY_INFO,
      },
    });
  }, []);

  const goToTravelLog = useCallback(() => {
    const now = new Date();
    router.push({
      pathname: "/(tabs)/mypage/webview/[url]",
      params: {
        url: PATH_ROUTE.WEBVIEW.TRAVEL_LOG({
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          date: now.getDate(),
        }),
      },
    });
  }, []);

  const goToCourseBookmark = useCallback(() => {
    router.push({
      pathname: "/(tabs)/mypage/webview/[url]",
      params: {
        url: PATH_ROUTE.WEBVIEW.COURSE_BOOKMARK,
      },
    });
  }, []);

  return {
    goToMyInfo,
    goToTravelLog,
    goToCourseBookmark,
  };
};

export default useRouteHandler;
