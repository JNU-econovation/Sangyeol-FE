import useHaptics from "@shared/hooks/common/useHaptic";
import { getPathToRoute } from "@shared/lib/bridge";
import { logMessageWithTime } from "@shared/lib/log";
import { MessageEventRequestData } from "@shared/types/webview";
import { router } from "expo-router";
import { useCallback } from "react";

/**
 * WebViewWithInjected 컴포넌트에서 middleware로직을 관리하는 훅
 */
const useMiddleware = () => {
  const { defaultFeedback } = useHaptics();

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
  }, []);

  return { middleware };
};

export default useMiddleware;
