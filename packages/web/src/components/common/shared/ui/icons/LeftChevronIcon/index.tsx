import Left_Chevron from "@/icons/Left_Chevron.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "왼쪽 화살표";
const DEFAULT_WIDTH = 32;
const DEFAULT_HEIGHT = 32;

interface LeftChevronIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
}

export default function LeftChevronIcon({
  alt = DEFAULT_ALT,
  ...props
}: LeftChevronIconProps) {
  return (
    <Image
      src={Left_Chevron}
      alt={alt}
      width={DEFAULT_WIDTH}
      height={DEFAULT_HEIGHT}
      className="min-w-[32px] min-h-[32px]"
      {...props}
    />
  );
}
