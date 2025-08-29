"use client";

import Iframe from "@components/Iframe";
import useStackContext from "@hooks/useStackContext";
import type { StackLinkParams } from "@models/index";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

const DEFAULT_DURATION = 240;

interface UseStackLinkRouterProps {
  prefetchHref?: string | null;
}

export default function useStackLinkRouter({
  prefetchHref,
}: UseStackLinkRouterProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  const preloadFrameRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isNavigatingRef = useRef(false);

  const router = useRouter();
  const { push } = useStackContext();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (prefetchHref) router.prefetch(prefetchHref);

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
      if (main) {
        main.style.transition = "";
        main.style.transform = "";
        main.style.zIndex = "";
      }

      if (currentIframe) {
        currentIframe.remove();
      }
    };
  }, [prefetchHref, router]);

  const navigate = useCallback(
    ({ href, animation = "slide" }: Omit<StackLinkParams, "preLoad">) => {
      if (typeof window === "undefined" || isNavigatingRef.current) return;

      const main = document.getElementById("stack-main");
      if (!main) {
        console.error(
          "[StackLink] Main element not found. Ensure it exists in your layout.",
        );
        return;
      }

      if (!preloadFrameRef.current) {
        console.error("preloadFrame reference is not set.");
        return;
      }

      isNavigatingRef.current = true;
      const animDuration = animation !== "slide" ? 0 : DEFAULT_DURATION;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (animation === "slide") {
        main.style.transition = `transform ${animDuration}ms ease-in-out`;
        main.style.transform = "translateX(-20%)";

        preloadFrameRef.current.style.transform = "translateX(-100%)";
        preloadFrameRef.current.style.transition = `transform ${animDuration}ms ease-in-out`;

        push([window.location.href, href]);

        timerRef.current = setTimeout(() => {
          main.style.transition = "";
          main.style.transform = "translateX(0)";
          main.style.zIndex = "-999";
          router.push(href);
          isNavigatingRef.current = false;
        }, animDuration);
      }

      if (animation === "none") {
        preloadFrameRef.current.style.transform = "translateX(0)";
        preloadFrameRef.current.style.transition = "none";
        main.style.zIndex = "-999";
        // 스택에 현재 경로와 이동한 경로 추가
        push([window.location.href, href]);
        router.push(href);
      }
    },
    [prefetchHref, push, router],
  );

  // 자동으로 portal 렌더링
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!portalElement) return;

    const portalDiv = document.createElement("div");

    portalDiv.style.position = "fixed";
    portalDiv.style.top = "0";
    portalDiv.style.width = "100vw";
    portalDiv.style.height = "100vh";
    portalDiv.style.backgroundColor = "#ffffff";
    portalDiv.style.transform = "translateZ(0) translateX(100%)";
    portalDiv.style.willChange = "transform";
    portalDiv.style.zIndex = "999";
    portalDiv.style.pointerEvents = "none";
    portalDiv.style.userSelect = "none";

    portalElement.appendChild(portalDiv);
    preloadFrameRef.current = portalDiv;

    if (prefetchHref)
      createRoot(portalDiv).render(<Iframe src={prefetchHref} />);

    return () => {
      if (portalDiv.parentNode) {
        portalDiv.parentNode.removeChild(portalDiv);
      }
    };
  }, [portalElement, prefetchHref]);

  return {
    navigate,
    isNavigating: isNavigatingRef.current,
  };
}
