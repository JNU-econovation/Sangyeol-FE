import {
  ColorType,
  OpacityType,
  SizeType,
  TextAlignType,
  WeightType,
  ZIndexType,
} from "@/types/css";
import { cn } from "@/utils/cn";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  color?: ColorType;
  fontSize?: SizeType;
  fontWeight?: WeightType;
  display?: "block" | "inline";
  align?: TextAlignType;
  opacity?: OpacityType;
  zIndex?: ZIndexType;
}

export default function Text({
  children,
  className,
  color = "text-black",
  fontSize = "text-base",
  fontWeight = "font-normal",
  display = "inline",
  align = "text-left",
  opacity = "opacity-100",
  zIndex,
}: TextProps) {
  return (
    <span
      className={cn(
        color,
        fontSize,
        fontWeight,
        className,
        display,
        zIndex,
        align,
        opacity
      )}
    >
      {children}
    </span>
  );
}
