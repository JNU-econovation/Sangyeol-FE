"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

import useStackContext from "../../hooks/useStackContext";

import { useRouter } from "next/navigation";

export default function GoBackTrigger() {
  const [isTouching, setIsTouching] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const goBackTriggerElementId = useId();

  const { portalElement, history, pop } = useStackContext();

  const router = useRouter();

  useEffect(() => {
    if (!isTouching) return;

    const main = document.getElementById("stack-main");
    if (!main) {
      console.error(
        "[GoBackTrigger] Main element not found. Ensure it exists in your layout."
      );
      return;
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const newX = e.touches[0].clientX;
      setCurrentX(newX);

      const deltaX = newX - startX;
      if (deltaX > 0) {
        main.style.transform = `translateX(${deltaX}px)`;
      }
    };

    const handleTouchEnd = () => {
      const deltaX = currentX - startX;

      if (deltaX > 50) {
        setIsNavigating(true);
        main.style.transform = "translateX(100%)";
        main.style.transition = "transform 0.23s ease";

        pop();

        setTimeout(() => {
          setIsNavigating(false);
          main.style.transition = "none";
          main.style.transform = "translateX(0px)";
          setStartX(0);
          setCurrentX(0);
          setIsTouching(false);
          router.back();
        }, 200);

        return;
      }

      // 원래 위치로 복귀
      main.style.transform = "translateX(0px)";
      setIsTouching(false);
      setStartX(0);
      setCurrentX(0);
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isTouching, startX, currentX, history, router, pop]);

  if (history.length <= 0) return null;

  return (
    <>
      {portalElement &&
        !isNavigating &&
        createPortal(
          <div className="fixed w-screen h-screen top-0 left-0 transform-gpu -z-50 select-none" />,
          portalElement
        )}

      {createPortal(
        <div
          id={goBackTriggerElementId}
          className="fixed w-10 h-screen top-0 transform-gpu select-none z-[9999] -translate-x-1"
          role="button"
          onTouchStart={(e) => {
            e.stopPropagation();
            e.preventDefault();
            const touchX = e.touches[0].clientX;
            setStartX(touchX);
            setCurrentX(touchX);
            setIsTouching(true);
          }}
        />,
        document.body
      )}
    </>
  );
}
