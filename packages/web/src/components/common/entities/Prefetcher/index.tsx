"use client";

import { Suspense } from "@suspensive/react";

/* eslint-disable @typescript-eslint/no-explicit-any */

type PrefetchHook = (p: any) => void;

interface PrefetcherProps {
  hooks: {
    prefetchHook: PrefetchHook;
    args: Record<string, unknown>;
  }[];
}

export default Suspense.with(
  {
    name: "Prefetcher",
  },
  ({ hooks }: PrefetcherProps) => {
    hooks.forEach((hook) => {
      hook.prefetchHook(hook.args);
    });
    return null;
  }
);
