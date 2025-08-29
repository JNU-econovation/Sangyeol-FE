"use client";

import { PropsWithChildren, useCallback, useEffect, useState } from "react";

import GoBackTrigger from "@components/GoBackTrigger";
import StackContext from "@context/stackContext";
import type { PathTuple } from "@models/index";

export default function StackLinkProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<PathTuple[]>([]);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  const push = useCallback((pathTuple: PathTuple) => {
    setHistory((prev) => [...prev, pathTuple]);
  }, []);

  const pop = useCallback(() => {
    setHistory((prev) => prev.slice(0, -1));
  }, []);

  useEffect(() => {
    const element = document.getElementById("stack-root");
    if (!element) {
      console.error("[StackLinkProvider] stack-root element not found");
    }

    setPortalElement(element);
  }, []);

  return (
    <StackContext.Provider value={{ portalElement, history, push, pop }}>
      <div
        id="stack-main"
        style={{
          position: "relative",
          backgroundColor: "white",
          transform: "gpu",
        }}
      >
        {children}
      </div>
      <div id="stack-root" />
      {portalElement && history.length > 0 && <GoBackTrigger />}
    </StackContext.Provider>
  );
}
