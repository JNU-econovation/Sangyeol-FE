import RightChevronThin from "@/icons/Right_Chevron_Thin.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "왼쪽 얇은 화살표";

interface RightChevronThinIconProps
  extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  alt?: string;
}

export default function RightChevronThinIcon({
  alt = DEFAULT_ALT,
  ...props
}: RightChevronThinIconProps) {
  return <Image src={RightChevronThin} alt={alt} {...props} />;
}
