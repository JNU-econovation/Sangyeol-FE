import Manual_Animal from "@/icons/Manual_Animal.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "동물 매뉴얼";
const DEFAULT_WIDTH = 61;
const DEFAULT_HEIGHT = 61;

interface ManualAnimalIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function ManualAnimalIcon({
  alt = DEFAULT_ALT,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: ManualAnimalIconProps) {
  return (
    <Image
      src={Manual_Animal}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}
