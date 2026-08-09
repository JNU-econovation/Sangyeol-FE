import Rain from "@/icons/Rain.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "비";

interface RainIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function RainIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: RainIconProps) {
  return (
    <Image src={Rain} alt={alt} width={width} height={height} {...props} />
  );
}
