import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import useStackContext from "@hooks/useStackContext";

//TODO: 애니메이션 타입 따로 관리
type AnimationType = "slide" | "fade" | "none";

const DEFAULT_DURATION = 240;

const useStackLinkBack = () => {
  const [animationState, setAnimationState] = useState<{
    type: AnimationType;
    active: boolean;
  }>({ type: "slide", active: false });
  const { pop, history, isAnimating, setIsAnimating, handleGoBack } =
    useStackContext();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const router = useRouter();

  const canGoBack = history.length > 0;

  useEffect(() => {
    if (!animationState.active) return;

    // 이미 다른 애니메이션이 실행 중이면 무시
    if (isAnimating) {
      setAnimationState({ type: "slide", active: false });
      return;
    }

    setIsAnimating(true);

    if (animationState.type === "none") {
      // 애니메이션 없이 바로 뒤로가기
      setAnimationState({ type: "slide", active: false });
      setIsAnimating(false);
      handleGoBack();
      router.back();
      pop();
      return;
    }

    const main = document.getElementById("stack-main");
    const previous = document.getElementById("stack-previous");

    if (!main) {
      console.warn("[useStackLinkBack] Main element not found.");
      setAnimationState({ type: "slide", active: false });
      setIsAnimating(false);
      return;
    }
    if (!previous) {
      console.warn("[useStackLinkBack] Previous element not found.");
      setAnimationState({ type: "slide", active: false });
      setIsAnimating(false);
      return;
    }

    if (animationState.type === "slide") {
      main.style.transform = "translateX(100%)";
      main.style.transition = `transform ${DEFAULT_DURATION}ms ease-in-out`;
      previous.style.transform = "translateX(0%)";
      previous.style.transition = `transform ${DEFAULT_DURATION}ms ease-in-out`;
      previous.style.zIndex = "-999";
    }
    if (animationState.type === "fade") {
      main.style.opacity = "0";
      main.style.transition = `opacity ${DEFAULT_DURATION}ms ease-in-out`;
      previous.style.transform = "translateX(0%)";
      previous.style.opacity = "1";
      previous.style.transition = `opacity ${DEFAULT_DURATION}ms ease-in-out`;
    }

    timeoutRef.current = setTimeout(() => {
      setAnimationState({ type: "slide", active: false });
      setIsAnimating(false);
      pop();
      router.back();

      previous.style.transform = "translateX(-20%)";

      if (animationState.type === "slide") {
        main.style.transform = "";
        main.style.transition = "";
        previous.style.transition = "";
        previous.style.zIndex = "-1";
      }
      if (animationState.type === "fade") {
        main.style.opacity = "";
        main.style.transition = "";
        previous.style.transition = "";
      }
      timeoutRef.current = null;
    }, DEFAULT_DURATION);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        // 진행 중이던 애니메이션 정리
        setIsAnimating(false);
      }
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
