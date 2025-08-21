import Frostbite from "@/icons/Frostbite.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "동상";

interface FrostbiteIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function FrostbiteIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: FrostbiteIconProps) {
  return (
    <Image
      src={Frostbite}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}