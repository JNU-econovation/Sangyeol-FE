import { SizeNumberType } from "@/types/css/height";
import { memo } from "react";

interface SpacingProps {
  size: SizeNumberType;
}

export default memo(function Spacing({ size }: SpacingProps) {
  return (
    <div
      style={{
        height: `${size * 0.25}rem`,
      }}
    />
  );
});
