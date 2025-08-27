"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useStackContext from "../useStackContext";
import Iframe from "../../components/Iframe";
import type { StackLinkParams } from "../../types";

const DEFAULT_DURATION = 240;

interface UseStackLinkRouterProps {
  prefetchHref?: string | null;
}

export default function useStackLinkRouter({
  prefetchHref,
}: UseStackLinkRouterProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  const iframeRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isNavigatingRef = useRef(false);
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
    if (prefetchHref) router.prefetch(prefetchHref);

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

      if (!iframeRef.current) {
        console.error("Iframe reference is not set.");
        return;
      }

      isNavigatingRef.current = true;
      const animDuration = animation !== "slide" ? 0 : DEFAULT_DURATION;

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

      iframeRef.current.style.transform = "translateX(-100%)";
      iframeRef.current.style.transition = `transform ${animDuration}ms ease-in-out`;

      push([window.location.href, href]);

      timerRef.current = setTimeout(() => {
        main.style.transition = "";
        main.style.transform = "translateX(0)";
        main.style.zIndex = "-999";
        router.push(href);
        isNavigatingRef.current = false;
      }, animDuration);
    },
    [prefetchHref, push, router],
  );

  // 자동으로 portal 렌더링
  useEffect(() => {
    if (!portalElement) return;

    const portalDiv = document.createElement("div");
    portalDiv.className =
      "fixed w-screen h-screen top-0 transform-gpu translate-x-full bg-white z-[999] select-none";

    if (prefetchHref) {
      const iframe = document.createElement("iframe");
      iframe.src = prefetchHref;
      iframe.className = "w-screen h-screen hide-scrollbar";
      portalDiv.appendChild(iframe);
    }

    portalElement.appendChild(portalDiv);
    iframeRef.current = portalDiv;

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
