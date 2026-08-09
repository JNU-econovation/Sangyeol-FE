import Copy from "@/icons/Copy.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "복사";
const DEFAULT_WIDTH = 24;
const DEFAULT_HEIGHT = 24;

interface CopyIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function CopyIcon({
  alt = DEFAULT_ALT,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: CopyIconProps) {
  return (
    <Image src={Copy} alt={alt} width={width} height={height} {...props} />
  );
}
