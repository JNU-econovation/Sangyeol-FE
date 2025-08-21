import X from "@/icons/X.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "닫기";

interface XIconProps extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  alt?: string;
}

export default function XIcon({ alt = DEFAULT_ALT, ...props }: XIconProps) {
  return <Image src={X} alt={alt} {...props} />;
}
