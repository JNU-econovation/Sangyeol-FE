import Broken_Born from "@/icons/Broken_Born.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "골절";

interface BrokenBornIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
}

export default function BrokenBornIcon({
  alt = DEFAULT_ALT,
  ...props
}: BrokenBornIconProps) {
  return <Image src={Broken_Born} alt={alt} {...props} />;
}
