import Manual_Temperature from "@/icons/Manual_Temperature.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "체온 매뉴얼";
const DEFAULT_WIDTH = 61;
const DEFAULT_HEIGHT = 61;

interface ManualTemperatureIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function ManualTemperatureIcon({
  alt = DEFAULT_ALT,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: ManualTemperatureIconProps) {
  return (
    <Image
      src={Manual_Temperature}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}
