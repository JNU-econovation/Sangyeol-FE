import Manual_Distress from "@/icons/Manual_Distress.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "응급상황 매뉴얼";
const DEFAULT_WIDTH = 61;
const DEFAULT_HEIGHT = 61;

interface ManualDistressIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function ManualDistressIcon({
  alt = DEFAULT_ALT,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: ManualDistressIconProps) {
  return (
    <Image
      src={Manual_Distress}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}
