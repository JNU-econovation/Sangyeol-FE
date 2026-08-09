import Cancel from "@/icons/Cancel.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "입력 취소";

interface CancelIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
}

export default function CancelIcon({
  alt = DEFAULT_ALT,
  ...props
}: CancelIconProps) {
  return <Image src={Cancel} alt={alt} {...props} />;
}
