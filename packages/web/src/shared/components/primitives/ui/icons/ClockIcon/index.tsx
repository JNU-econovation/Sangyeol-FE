import Clock from "@/icons/Clock.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "시계";

interface ClockIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function ClockIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: ClockIconProps) {
  return (
    <Image src={Clock} alt={alt} width={width} height={height} {...props} />
  );
}
