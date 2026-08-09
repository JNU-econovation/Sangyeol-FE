import LinkArrow from "@/icons/Link_Arrow.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "링크 화살표";

interface LinkArrowIconProps
  extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  alt?: string;
}

export default function LinkArrowIcon({
  alt = DEFAULT_ALT,
  ...props
}: LinkArrowIconProps) {
  return <Image src={LinkArrow} alt={alt} {...props} />;
}
