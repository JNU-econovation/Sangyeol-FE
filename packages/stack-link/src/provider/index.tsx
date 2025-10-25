"use client";

import { PropsWithChildren, useCallback, useState } from "react";

import GoBackTrigger from "@components/GoBackTrigger";
import StackContext from "@context/stackContext";
import type { PathTuple } from "@models/index";
import Iframe from "@/components/Iframe";

interface StackLinkProviderProps extends PropsWithChildren {
  onGoBack?: (history: PathTuple[]) => void;
}

export default function StackLinkProvider({
  onGoBack,
  children,
}: StackLinkProviderProps) {
  const [history, setHistory] = useState<PathTuple[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const push = useCallback((path: PathTuple) => {
    setHistory((prev) => [...prev, path]);
  }, []);

  const pop = useCallback(() => {
    setHistory((prev) => [...prev.filter((_, i) => i !== prev.length - 1)]);
  }, []);

  const handleGoBack = useCallback(() => {
    if (onGoBack) {
      onGoBack(history);
    }
  }, [onGoBack, history]);

  return (
    <StackContext.Provider
      value={{ history, push, pop, isAnimating, setIsAnimating, handleGoBack }}
    >
      <div
        id="stack-main"
        style={{
          position: "relative",
          backgroundColor: "white",
          transform: "translateZ(0)",
          minHeight: "100vh",
          minWidth: "100vw",
          willChange: "transform",
        }}
      >
        {children}
      </div>
      <div
        id="stack-root"
        style={{
          position: "relative",
          transform: "translateZ(0)",
        }}
      />
      {history.length > 0 && <GoBackTrigger />}

      <div
        id="stack-previous"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          transform: "translateX(-20%)",
          backgroundColor: "#ffffff",
          zIndex: -1,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        {history.length > 0 && history[history.length - 1][0] && (
          <Iframe
            key={history.map((h) => h[0]).join(",")}
            src={history[history.length - 1][0]}
            style={{
              width: "100%",
              height: "100%",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </StackContext.Provider>
  );
}
