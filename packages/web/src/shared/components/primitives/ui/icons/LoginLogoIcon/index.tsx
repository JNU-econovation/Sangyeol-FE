import Login_Logo from "@/icons/Login_Logo.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "로그인 로고";
const DEFAULT_WIDTH = 24;
const DEFAULT_HEIGHT = 24;

interface LoginLogoIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function LoginLogoIcon({
  alt = DEFAULT_ALT,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: LoginLogoIconProps) {
  return <Image src={Login_Logo} alt={alt} width={width} height={height} {...props} />;
}