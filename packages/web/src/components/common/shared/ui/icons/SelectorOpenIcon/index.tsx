import Selector_Open from "@/icons/Selector_Open.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "선택기 닫기";

interface SelectorOpenIcon
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function SelectorOpenIcon({
  alt = DEFAULT_ALT,
  ...props
}: SelectorOpenIcon) {
  return <Image src={Selector_Open} alt={alt} {...props} />;
}
