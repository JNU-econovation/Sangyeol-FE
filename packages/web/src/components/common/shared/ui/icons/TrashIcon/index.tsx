import Trash from "@/icons/Trash.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "휴지통";

interface TrashIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
}

export default function TrashIcon({
  alt = DEFAULT_ALT,
  ...props
}: TrashIconProps) {
  return <Image src={Trash} alt={alt} {...props} />;
}
