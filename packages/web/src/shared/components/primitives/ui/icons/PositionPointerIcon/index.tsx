import Position_Pointer from "@/icons/Position_Pointer.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "위치 포인터";

interface PositionPointerIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
}

export default function PositionPointerIcon({
  alt = DEFAULT_ALT,
  ...props
}: PositionPointerIconProps) {
  return <Image src={Position_Pointer} alt={alt} {...props} />;
}
