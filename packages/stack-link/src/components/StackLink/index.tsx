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

import useStackContext from "@hooks/useStackContext";
import type { StackLinkParams } from "@models/index";
import Iframe from "@components/Iframe";
import { isInStackFrame } from "@/utils";

const DEFAULT_DURATION = 240;

export interface StackLinkedProps extends PropsWithChildren, StackLinkParams {}

export default function StackLink({
  href,
  children,
  preLoad = false,
  // duration = DEFAULT_DURATION,
  animation = "slide",
}: StackLinkedProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const preloadFrameRef = useRef<HTMLIFrameElement>(null);
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
  }, [href, router]);

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

    const animDuration = animation === "slide" ? DEFAULT_DURATION : 0; //ms

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
      preloadFrameRef.current.style.transform = "translateX(0)";
      preloadFrameRef.current.style.transition = "none";
      main.style.zIndex = "-999";
      // 스택에 현재 경로와 이동한 경로 추가
      push([window.location.href, href]);
      router.push(href);

      // timerRef.current = setTimeout(() => {}, animDuration);
    }
  }, [animation, href, push, router]);

  if (typeof window === "undefined" || isInStackFrame()) return null;

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
            }}
          >
            {preLoad && <Iframe src={href} />}
          </div>,
          portalElement,
        )}
    </div>
  );
}
