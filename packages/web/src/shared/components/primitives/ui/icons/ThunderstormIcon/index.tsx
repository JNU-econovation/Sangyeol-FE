import Thunderstorm from "@/icons/Thunderstorm.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "뇌우";

interface ThunderstormIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function ThunderstormIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: ThunderstormIconProps) {
  return (
    <Image src={Thunderstorm} alt={alt} width={width} height={height} {...props} />
  );
}