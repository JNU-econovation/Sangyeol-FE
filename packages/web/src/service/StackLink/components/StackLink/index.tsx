"use client";

import { useRouter } from "next/navigation";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import useStackContext from "../../hooks/useStackContext";
import Iframe from "../Iframe";

const DEFAULT_DURATION = 240;

interface StackLinkedProps extends PropsWithChildren {
  href: string;
  // duration?: number;
  preLoad?: boolean;
  animation?: "slide" | "none";
}

export default function StackLink({
  href,
  children,
  preLoad = false,
  // duration = DEFAULT_DURATION,
  animation = "slide",
}: StackLinkedProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const originalStylesRef = useRef<{
    transition: string;
    transform: string;
    zIndex: string;
  }>({
    transition: "",
    transform: "",
    zIndex: "",
  });

  const router = useRouter();
  const { push } = useStackContext();

  useEffect(() => {
    router.prefetch(href);

    const element = document.getElementById("stack-root") || document.body;
    setPortalElement(element);

    const currentIframe = iframeRef.current;

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      const main = document.getElementById("stack-main");
      if (main && originalStylesRef.current) {
        main.style.transition = originalStylesRef.current.transition;
        main.style.transform = originalStylesRef.current.transform;
        main.style.zIndex = originalStylesRef.current.zIndex;
      }

      if (currentIframe) {
        currentIframe.remove();
      }
    };
  }, [href, router]);

  const slideScreen = useCallback(() => {
    if (typeof window === "undefined") return;
    const main = document.getElementById("stack-main");
    if (!main) {
      console.error(
        "[StackLink] Main element not found. Ensure it exists in your layout."
      );
      return;
    }

    const animDuration = animation === "slide" ? DEFAULT_DURATION : 0; //ms

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    originalStylesRef.current = {
      transition: main.style.transition,
      transform: main.style.transform,
      zIndex: main.style.zIndex,
    };

    main.style.transition = `transform ${animDuration}ms ease-in-out`;
    main.style.transform = "translateX(-20%)";

    if (!iframeRef.current) {
      console.error("Iframe reference is not set.");
      return;
    }

    iframeRef.current.style.transform = "translateX(-100%)";
    iframeRef.current.style.transition = `transform ${animDuration}ms ease-in-out`;

    // 스택에 현재 경로와 이동한 경로 추가
    push([window.location.href, href]);

    timerRef.current = setTimeout(() => {
      main.style.transition = "";
      main.style.transform = "translateX(0)";
      main.style.zIndex = "-999";
      router.push(href);
    }, animDuration);
  }, [animation, href, push, router]);

  return (
    <>
      <div onClick={slideScreen} className="transform-gpu">
        {children}
        {portalElement &&
          createPortal(
            <div
              ref={iframeRef}
              className="fixed w-screen h-screen top-0 transform-gpu translate-x-full bg-white z-[999] select-none"
            >
              {preLoad && <Iframe src={href} />}
            </div>,
            portalElement
          )}
      </div>
    </>
  );
}
