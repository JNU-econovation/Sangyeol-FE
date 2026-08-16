import useRouteBackBridge from "@shared/hooks/domain/bridge/useRouteBackBridge";
import type { RouteAnimation } from "@shared/types/route";
import { useCallback } from "react";
import { useStackLinkBack } from "stack-link";

const DEFAULT_ANIMATION: RouteAnimation = "slide";

const useGoBack = (animation: RouteAnimation = DEFAULT_ANIMATION) => {
  const { goBack, canGoBack } = useStackLinkBack();
  const goBackBridge = useRouteBackBridge();

  const handleGoBack = useCallback(() => {
    if (!canGoBack) return goBackBridge();
    goBack({ animation });
  }, [animation, canGoBack, goBack, goBackBridge]);

  return { handleGoBack };
};

export default useGoBack;
