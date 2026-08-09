import Kakao_Logo from "@/icons/Kakao_Logo.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "카카오 로고";
const DEFAULT_WIDTH = 24;
const DEFAULT_HEIGHT = 24;

interface KakaoLogoIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function KakaoLogoIcon({
  alt = DEFAULT_ALT,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: KakaoLogoIconProps) {
  return <Image src={Kakao_Logo} alt={alt} width={width} height={height} {...props} />;
}