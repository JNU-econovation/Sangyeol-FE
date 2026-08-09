import Star from "@/icons/Star.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "별";
const DEFAULT_WIDTH = 24;
const DEFAULT_HEIGHT = 24;

interface StarIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function StarIcon({
  alt = DEFAULT_ALT,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: StarIconProps) {
  return <Image src={Star} alt={alt} width={width} height={height} {...props} />;
}