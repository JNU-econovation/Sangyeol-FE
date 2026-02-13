import Selector_Close from "@/icons/Selector_Close.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "선택기 열기";

interface SelectorCloseIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function SelectorCloseIcon({
  alt = DEFAULT_ALT,
  ...props
}: SelectorCloseIconProps) {
  return <Image src={Selector_Close} alt={alt} {...props} />;
}
