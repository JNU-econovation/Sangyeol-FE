import Lock from "@/icons/Lock.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "잠김";

interface LockIconProps
  extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  alt?: string;
}

export default function LockIcon({
  alt = DEFAULT_ALT,
  ...props
}: LockIconProps) {
  return <Image src={Lock} alt={alt} {...props} />;
}
