"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import useStackContext from "../useStackContext";

//TODO: 애니메이션 타입 따로 관리
type AnimationType = "slide" | "fade" | "none";

const useStackLinkBack = () => {
  const [animationState, setAnimationState] = useState<{
    type: AnimationType;
    active: boolean;
  }>({ type: "slide", active: false });
  const { pop, history } = useStackContext();

  const router = useRouter();

  const canGoBack = history.length > 0;

  useEffect(() => {
    if (!animationState.active) return;

    if (animationState.type === "none") {
      // 애니메이션 없이 바로 뒤로가기
      setAnimationState({ type: "slide", active: false });
      router.back();
      pop();
      return;
    }

    const main = document.getElementById("stack-main");
    if (!main) {
      console.warn("[useStackLinkBack] Main element not found.");
      setAnimationState({ type: "slide", active: false });
      return;
    }

    if (history.length > 0) {
      if (animationState.type === "slide") {
        main.style.transform = "translateX(100%)";
        main.style.transition = "transform 0.2s ease-in-out";
      } else if (animationState.type === "fade") {
        main.style.opacity = "0";
        main.style.transition = "opacity 0.2s ease-in-out";
      }
    }

    const timeoutId = setTimeout(() => {
      setAnimationState({ type: "slide", active: false });
      router.back();
      pop();

      // 애니메이션 후 스타일 복원
      if (animationState.type === "fade") {
        main.style.opacity = "";
        main.style.transition = "";
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [animationState, history.length, pop, router]);

  const goBack = useCallback(
    ({ animation = "slide" }: { animation?: AnimationType }) => {
      setAnimationState({ type: animation, active: true });
    },
    [],
  );

  return { goBack, canGoBack };
};

export default useStackLinkBack;
