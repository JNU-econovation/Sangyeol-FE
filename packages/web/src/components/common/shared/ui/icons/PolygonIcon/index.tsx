import Polygon from "@/icons/Polygon.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "산행 기록 완료";

interface PolygonIconProps
  extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  alt?: string;
}

export default function PolygonIcon({
  alt = DEFAULT_ALT,
  ...props
}: PolygonIconProps) {
  return <Image src={Polygon} alt={alt} {...props} />;
}
