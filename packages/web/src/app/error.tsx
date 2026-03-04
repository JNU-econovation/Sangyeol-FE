"use client";

import useRouteBackBridge from "@/hooks/feature/bridge/useRouteBackBridge";
import { useEffect } from "react";
import { useStackLinkBack } from "stack-link";

export default function GlobalErrorPage({
  error,
  // reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { goBack, canGoBack } = useStackLinkBack();
  const goBackBridge = useRouteBackBridge();

  const navigateBack = () => {
    if (!canGoBack) return goBackBridge();
    goBack({
      animation: "none",
    });
  };

  useEffect(() => {
    console.error(error);
    navigateBack();
  }, [error]);

  return null;
}
