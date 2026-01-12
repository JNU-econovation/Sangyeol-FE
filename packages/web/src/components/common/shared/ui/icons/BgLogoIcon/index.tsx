import Bg_Logo from "@/icons/Bg_Logo.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "배경 아이콘";

interface BgLogoIconProps
  extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  alt?: string;
}

export default function BgLogoIcon({
  alt = DEFAULT_ALT,
  ...props
}: BgLogoIconProps) {
  return <Image src={Bg_Logo} alt={alt} width={140} {...props} />;
}
