import Sunny from "@/icons/Sunny.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "맑음";

interface SunnyIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function SunnyIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: SunnyIconProps) {
  return (
    <Image src={Sunny} alt={alt} width={width} height={height} {...props} />
  );
}
