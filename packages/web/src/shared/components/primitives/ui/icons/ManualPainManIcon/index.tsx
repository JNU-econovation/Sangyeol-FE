import Manual_Pain_Man from "@/icons/Manual_Pain_Man.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "통증 매뉴얼";
const DEFAULT_WIDTH = 61;
const DEFAULT_HEIGHT = 61;

interface ManualPainManIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function ManualPainManIcon({
  alt = DEFAULT_ALT,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: ManualPainManIconProps) {
  return (
    <Image
      src={Manual_Pain_Man}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}
