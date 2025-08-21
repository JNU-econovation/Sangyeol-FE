import Exhaustion from "@/icons/Exhaustion.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "탈진";

interface ExhaustionIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function ExhaustionIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: ExhaustionIconProps) {
  return (
    <Image
      src={Exhaustion}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}