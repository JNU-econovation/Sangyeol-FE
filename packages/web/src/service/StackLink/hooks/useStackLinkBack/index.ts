"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import useStackContext from "../useStackContext";

const useStackLinkBack = () => {
  const [flush, setFlush] = useState(false);
  const { pop, history } = useStackContext();

  const router = useRouter();

  const canGoBack = history.length > 0;

  useEffect(() => {
    if (!flush) return;
    const main = document.getElementById("stack-main");
    if (!main) {
      console.warn("[useStackLinkBack] Main element not found.");
      setFlush(false);
      return;
    }

    if (history.length > 0) {
      main.style.transform = "translateX(100%)";
      main.style.transition = "transform 0.2s ease-in-out";
    }
    const timeoutId = setTimeout(() => {
      setFlush(false);
      router.back();
      pop();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [flush, history.length, pop, router]);

  const goBack = useCallback(() => {
    setFlush((prev) => !prev);
  }, [setFlush]);

  return { goBack, canGoBack };
};

export default useStackLinkBack;
