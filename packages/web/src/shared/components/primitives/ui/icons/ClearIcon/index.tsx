import Clear from "@/icons/Clear.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "맑음";

interface ClearIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function ClearIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: ClearIconProps) {
  return (
    <Image src={Clear} alt={alt} width={width} height={height} {...props} />
  );
}
