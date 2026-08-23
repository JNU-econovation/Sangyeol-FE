import useHaptics from "@shared/hooks/common/useHaptic";
import useOpenNaverMapRoute from "@shared/hooks/common/useOpenNaverMapRoute";
import { getPathToRoute } from "@shared/utils/bridge";
import { logMessageWithTime } from "@shared/utils/log";
import { MessageEventRequestData } from "@shared/types/webview";
import { router } from "expo-router";
import { useCallback } from "react";

/**
 * WebViewWithInjected 컴포넌트에서 middleware로직을 관리하는 훅
 * 웹으로 부터 받은 메시지를 처리합니다.
 * return문은 웹으로 다시 메시지를 보내는 용도로 사용됩니다.
 */
const useMiddleware = () => {
  const { defaultFeedback } = useHaptics();
  const { openNaverMapRoute } = useOpenNaverMapRoute();

  const middleware = useCallback((reqMessage: MessageEventRequestData) => {
    logMessageWithTime(`WebView received: \n${JSON.stringify(reqMessage)}`);

    const { name, method, body } = reqMessage;

    if (name === ("log-message" as string)) {
      console.log(body);
      return;
    }

    // 라우팅 메시지 처리
    if (name === ("route-to" as string) && method === "POST") {
      const { path, routeType, params } = body as {
        path: string;
        routeType?: "replace" | "push";
        params?: Record<string, any>[];
      };

      if (routeType === "replace") {
        router.replace(getPathToRoute({ path, params }));
      }
      if (routeType === "push" || !routeType) {
        router.push(getPathToRoute({ path, params }));
      }

      // TODO: 동적 에러처리 필요

      return {
        name: "route-to",
        status: "success",
      };
    }

    // 뒤로가기 메시지 처리
    if (name === "route-back" && method === "POST") {
      try {
        router.back();
      } catch (error) {
        console.warn(error);
        router.push("/");
      }

      return {
        name: "route-back",
        status: "success",
      };
    }

    if (name === "haptic" && method === "POST") {
      defaultFeedback();
    }

    if (name === "route-to-internal-webview" && method === "POST") {
      const { uri } = body as { uri: string };
      router.push(`/webview/${encodeURIComponent(uri)}`);
    }

    // 외부 소스를 띄우는 아우터 웹뷰(모달) 라우팅 메시지 처리
    if (name === "route-to-external-webview" && method === "POST") {
      const { uri } = body as { uri: string };
      router.push(`/external-webview/${encodeURIComponent(uri)}`);

      return {
        name: "route-to-external-webview",
        status: "success",
      };
    }

    // 네이버 지도 길찾기 메시지 처리
    if (name === "open-naver-map-route" && method === "POST") {
      const { dlat, dlng, dname } = body as {
        dlat: number;
        dlng: number;
        dname: string;
      };

      openNaverMapRoute({ dlat, dlng, dname });

      return {
        name: "open-naver-map-route",
        status: "success",
      };
    }
  }, []);

  return { middleware };
};

export default useMiddleware;
