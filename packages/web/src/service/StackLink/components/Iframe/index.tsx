"use client";

import { HTMLAttributes } from "react";

interface IframeProps extends HTMLAttributes<HTMLIFrameElement> {
  src: string;
}

export default function Iframe({ src, ...props }: IframeProps) {
  return (
    <iframe src={src} {...props} className="w-screen h-screen hide-scrollbar" />
  );
}
