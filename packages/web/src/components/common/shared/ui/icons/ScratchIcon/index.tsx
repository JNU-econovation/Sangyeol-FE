import Scratch from "@/icons/Scratch.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "긁힘";

interface ScratchIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function ScratchIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: ScratchIconProps) {
  return (
    <Image src={Scratch} alt={alt} width={width} height={height} {...props} />
  );
}
