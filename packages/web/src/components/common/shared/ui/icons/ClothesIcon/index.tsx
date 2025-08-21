import Clothes from "@/icons/Clothes.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "옷";
const DEFAULT_WIDTH = 40;
const DEFAULT_HEIGHT = 40;

interface ClothesIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
}

export default function ClothesIcon({
  alt = DEFAULT_ALT,
  ...props
}: ClothesIconProps) {
  return (
    <Image
      src={Clothes}
      width={DEFAULT_WIDTH}
      height={DEFAULT_HEIGHT}
      alt={alt}
      {...props}
    />
  );
}
