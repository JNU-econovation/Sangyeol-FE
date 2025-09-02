import Drizzle from "@/icons/Drizzle.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "이슬비";

interface DrizzleIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function DrizzleIcon({
  alt = DEFAULT_ALT,
  width,
  height,
  ...props
}: DrizzleIconProps) {
  return (
    <Image src={Drizzle} alt={alt} width={width} height={height} {...props} />
  );
}