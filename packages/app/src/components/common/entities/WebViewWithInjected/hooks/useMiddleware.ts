import { MessageEventRequestData } from "@model/webview";
import useToast from "@service/toast";
import { getPathToRoute } from "@utils/bridge";
import { logMessageWithTime } from "@utils/log";
import { router } from "expo-router";
import { useCallback } from "react";

/**
 * WebViewWithInjected 컴포넌트에서 middleware로직을 관리하는 훅
 */
const useMiddleware = () => {
  const showToast = useToast();

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

      routeType === "replace"
        ? router.replace(getPathToRoute({ path, params }))
        : router.push(getPathToRoute({ path, params }));

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
        router.push("/(tabs)/home");
      }

      return {
        name: "route-back",
        status: "success",
      };
    }

    // 토스트 메시지 처리
    if (name === "show-toast" && method === "POST") {
      const toastProps = body as {
        type: "success" | "info" | "error";
        text1: string;
        text2: string;
      };

      showToast(toastProps);

      return {
        name: "show-toast",
        status: "success",
      };
    }
  }, []);

  return { middleware };
};

export default useMiddleware;
