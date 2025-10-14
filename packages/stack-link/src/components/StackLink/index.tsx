"use client";

import { useRouter } from "next/navigation";
import {
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { isInStackFrame } from "@/utils";
import Iframe from "@components/Iframe";
import useStackContext from "@hooks/useStackContext";
import type { StackLinkParams } from "@models/index";

const DEFAULT_DURATION = 280;

export interface StackLinkedProps extends PropsWithChildren, StackLinkParams {}

export default function StackLink({
  href,
  children,
  preLoad = false,
  duration = DEFAULT_DURATION,
  animation = "slide",
}: StackLinkedProps) {
  const shouldRender = !(typeof window === "undefined" || isInStackFrame());

  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const preloadFrameRef = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    if (!shouldRender) return;

    router.prefetch(href);

    const element = document.getElementById("stack-root");
    if (!element) return;

    element.style.position = "fixed";
    element.style.top = "0";
    element.style.width = "100vw";
    element.style.height = "100vh";
    element.style.backgroundColor = "#ffffff";
    element.style.transform = "translateZ(0) translateX(100%)";
    element.style.willChange = "transform";
    element.style.zIndex = "999";
    element.style.pointerEvents = "none";
    element.style.userSelect = "none";
    setPortalElement(element);

    const currentIframe = preloadFrameRef.current;

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
  }, [shouldRender, href, router]);

  const slideScreen = useCallback(() => {
    if (typeof window === "undefined") return;
    //TODO: 하드코딩 피하기
    const main = document.getElementById("stack-main"); // 실제 컨텐츠가 있는 곳
    if (!main) {
      console.error(
        "[StackLink] Main element not found. Ensure it exists in your layout.",
      );
      return;
    }

    const animDuration =
      duration ?? (animation === "slide" || animation === "fade" ? DEFAULT_DURATION : 0); // ms

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (animation === "slide") {
      main.style.transition = `transform ${animDuration}ms ease-in-out`;
      main.style.transform = "translateX(-20%)";

      if (!preloadFrameRef.current) {
        console.error("Iframe reference is not set.");
        return;
      }
      preloadFrameRef.current.style.transform = "translateX(-100%)";
      preloadFrameRef.current.style.transition = `transform ${animDuration}ms ease-in-out`;

      // 스택에 현재 경로와 이동한 경로 추가
      push([window.location.href, href]);

      timerRef.current = setTimeout(() => {
        main.style.transition = "";
        main.style.transform = "translateX(0)";
        main.style.zIndex = "-999";
        router.push(href);
      }, animDuration);
    }

    if (animation === "none") {
      push([window.location.href, href]);
      router.push(href);
      return;
    }

    if (animation === "fade") {
      // opacity 0.2초동안 100 -> 0 되도록
      main.style.transition = `opacity ${animDuration}ms ease-in-out`;
      main.style.opacity = "0.1";

      if (!preloadFrameRef.current) {
        console.error("Iframe reference is not set.");
        return;
      }

      // opacity 0.2초동안 0 -> 100 되도록
      preloadFrameRef.current.style.transform = "translateX(-100%)";
      preloadFrameRef.current.style.transition = `opacity ${animDuration}ms ease-in-out`;
      preloadFrameRef.current.style.opacity = "1";

      // 스택에 현재 경로 추가
      push([window.location.href, href]);

      timerRef.current = setTimeout(() => {
        main.style.transition = "";
        main.style.opacity = "1";
        main.style.zIndex = "-999";
        router.push(href);
      }, animDuration);
    }
  }, [animation, href, push, router, duration]);

  if (!shouldRender) return null;

  return (
    <div onClick={slideScreen}>
      {children}
      {portalElement &&
        createPortal(
          <div
            ref={preloadFrameRef}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: "#ffffff",
              top: 0,
              left: 0,
              opacity: animation === "fade" ? 0 : 1,
            }}
          >
            {preLoad && <Iframe src={href} />}
          </div>,
          portalElement,
        )}
    </div>
  );
}
