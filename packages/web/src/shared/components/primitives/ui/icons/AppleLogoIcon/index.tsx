import Apple_Logo from "@/icons/Apple_Logo.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "애플 로고";
const DEFAULT_WIDTH = 24;
const DEFAULT_HEIGHT = 24;

interface AppleLogoIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function AppleLogoIcon({
  alt = DEFAULT_ALT,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: AppleLogoIconProps) {
  return <Image src={Apple_Logo} alt={alt} width={width} height={height} {...props} />;
}
