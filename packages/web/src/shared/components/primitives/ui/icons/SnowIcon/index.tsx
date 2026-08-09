import Snow from "@/icons/Snow.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "눈";

interface SnowIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function SnowIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: SnowIconProps) {
  return (
    <Image src={Snow} alt={alt} width={width} height={height} {...props} />
  );
}
