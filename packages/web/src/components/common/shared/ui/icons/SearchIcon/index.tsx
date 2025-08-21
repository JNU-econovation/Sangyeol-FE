import Search from "@/icons/Search.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "검색";
const DEFAULT_WIDTH = 24;
const DEFAULT_HEIGHT = 24;

interface SearchIconProps
  extends Omit<
    ComponentProps<typeof Image>,
    "src" | "width" | "height" | "alt"
  > {
  alt?: string;
  width?: number;
  height?: number;
}

export default function SearchIcon({
  alt = DEFAULT_ALT,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: SearchIconProps) {
  return <Image src={Search} alt={alt} width={width} height={height} {...props} />;
}
