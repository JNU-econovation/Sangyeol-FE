import Search from "@/icons/Star_Weak.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "별 모양 아이콘";

interface StarWeakIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
}

export default function StarWeakIcon({
  alt = DEFAULT_ALT,
  ...props
}: StarWeakIconProps) {
  return <Image src={Search} alt={alt} {...props} />;
}
