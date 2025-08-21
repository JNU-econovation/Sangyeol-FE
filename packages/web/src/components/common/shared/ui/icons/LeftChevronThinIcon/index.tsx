import LeftChevronThin from "@/icons/Left_Chevron_Thin.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "왼쪽 얇은 화살표";

interface LeftChevronThinIconProps
  extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  alt?: string;
}

export default function LeftChevronThinIcon({
  alt = DEFAULT_ALT,
  ...props
}: LeftChevronThinIconProps) {
  return <Image src={LeftChevronThin} alt={alt} {...props} />;
}
