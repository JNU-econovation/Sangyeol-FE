import Clouds from "@/icons/Clouds.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "흐림";

interface CloudsIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function CloudsIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: CloudsIconProps) {
  return (
    <Image src={Clouds} alt={alt} width={width} height={height} {...props} />
  );
}