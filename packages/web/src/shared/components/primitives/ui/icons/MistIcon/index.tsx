import Mist from "@/icons/Mist.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "안개";

interface MistIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function MistIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: MistIconProps) {
  return (
    <Image src={Mist} alt={alt} width={width} height={height} {...props} />
  );
}