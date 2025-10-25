"use client";

import { memo, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import useStackContext from "@hooks/useStackContext";

import { useRouter } from "next/navigation";

const DEFAULT_DURATION = 280;

export default memo(function GoBackTrigger() {
  const [isTouching, setIsTouching] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const goBackTriggerElementId = useId();

  const { history, pop, isAnimating, setIsAnimating, handleGoBack } =
    useStackContext();

  const router = useRouter();

  const handleMove = (clientX: number) => {
    if (isAnimating) return;

    const previousScreenPreview = document.getElementById("stack-previous");
    const main = document.getElementById("stack-main");
    if (!main) {
      console.error(
        "[GoBackTrigger] Main element not found. Ensure it exists in your layout.",
      );
      return;
    }

    currentXRef.current = clientX;

    const deltaX = clientX - startXRef.current;
    if (deltaX > 0) {
      main.style.transform = `translateX(${deltaX}px)`;
    }

    if (previousScreenPreview) {
      const percentage = (deltaX / window.innerWidth) * 100;
      previousScreenPreview.style.transform = `translateX(${-20 + percentage * 0.2}%)`;
    }
  };

  const handleEnd = () => {
    if (isAnimating) return;

    const previousScreenPreview = document.getElementById("stack-previous");
    const main = document.getElementById("stack-main");
    if (!main) {
      setIsTouching(false);
      startXRef.current = 0;
      currentXRef.current = 0;
      return;
    }

    const deltaX = currentXRef.current - startXRef.current;

    if (deltaX > 50) {
      setIsAnimating(true);
      main.style.transform = "translateX(100%)";
      main.style.transition = `transform ${DEFAULT_DURATION}ms ease-in-out`;

      if (previousScreenPreview) {
        previousScreenPreview.style.transform = "translateX(0%)";
        previousScreenPreview.style.transition = `transform ${DEFAULT_DURATION}ms ease-in-out`;
      }

      setTimeout(() => {
        setIsAnimating(false);

        main.style.transition = "none";
        main.style.transform = "translateX(0px)";

        if (previousScreenPreview) {
          previousScreenPreview.style.transform = "translateX(-20%)";
          previousScreenPreview.style.zIndex = "-1";
        }

        startXRef.current = 0;
        currentXRef.current = 0;
        setIsTouching(false);
        handleGoBack();
        router.back();
        pop();
      }, DEFAULT_DURATION);

      return;
    } else {
      main.style.transform = "translateX(0px)";
      main.style.transition = `transform ${DEFAULT_DURATION}ms ease`;
      if (previousScreenPreview) {
        previousScreenPreview.style.transform = "translateX(-20%)";
      }
      setIsTouching(false);
      startXRef.current = 0;
      currentXRef.current = 0;
      setTimeout(() => {
        main.style.transition = "none";
      }, DEFAULT_DURATION);
    }
  };

  if (history.length <= 0) return null;

  return (
    <>
      {createPortal(
        <div
          id={goBackTriggerElementId}
          style={{
            position: "fixed",
            width: "2.5rem",
            height: "100vh",
            top: 0,
            left: 0,
            transform: "translateX(-20%)",
            zIndex: 9998,
            touchAction: "none",
          }}
          role="button"
          onTouchStart={(e) => {
            e.stopPropagation();
            const touchX = e.touches[0].clientX;
            startXRef.current = touchX;
            currentXRef.current = touchX;
            setIsTouching(true);

            if (history.length > 2) {
              router.prefetch(history[history.length - 2][1]);
            }
          }}
          onTouchMove={(e) => {
            if (!isTouching) return;
            e.stopPropagation();
            handleMove(e.touches[0].clientX);
          }}
          onTouchEnd={(e) => {
            if (!isTouching) return;
            e.stopPropagation();
            handleEnd();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            const mouseX = e.clientX;
            startXRef.current = mouseX;
            currentXRef.current = mouseX;
            setIsTouching(true);

            if (history.length > 2) {
              router.prefetch(history[history.length - 2][1]);
            }
          }}
          onMouseMove={(e) => {
            if (!isTouching) return;
            e.stopPropagation();
            handleMove(e.clientX);
          }}
          onMouseUp={(e) => {
            if (!isTouching) return;
            e.stopPropagation();
            handleEnd();
          }}
        />,
        document.body,
      )}
    </>
  );
});
