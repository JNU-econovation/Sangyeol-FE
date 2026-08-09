import Star_Block from "@/icons/Star_Block.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "색칠된 별 모양 아이콘";

interface StarBlockIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
}

export default function StarBlockIcon({
  alt = DEFAULT_ALT,
  ...props
}: StarBlockIconProps) {
  return <Image src={Star_Block} alt={alt} {...props} />;
}
