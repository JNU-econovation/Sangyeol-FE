import WeekPolygon from "@/icons/Week_Polygon.svg";
import Image from "next/image";
import { ComponentProps } from "react";

const DEFAULT_ALT = "산행 기록 미완료";

interface WeekPolygonIconProps
  extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  alt?: string;
}

export default function WeekPolygonIcon({
  alt = DEFAULT_ALT,
  ...props
}: WeekPolygonIconProps) {
  return <Image src={WeekPolygon} alt={alt} {...props} />;
}
