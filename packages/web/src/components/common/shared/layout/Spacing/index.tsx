import { SizeNumberType } from "@/types/css/height";
import { memo } from "react";

export interface SpacingProps {
  size: number;
  className?: string;
}

export default memo(function Spacing({ size, className }: SpacingProps) {
  return (
    <div
      style={{
        height: `${size * 0.25}rem`,
      }}
      className={className}
    />
  );
});
