"use client";

import { HTMLAttributes } from "react";

interface IframeProps extends HTMLAttributes<HTMLIFrameElement> {
  src: string;
}

export default function Iframe({ src, ...props }: IframeProps) {
  return (
    <iframe
      src={src}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      {...props}
    />
  );
}
