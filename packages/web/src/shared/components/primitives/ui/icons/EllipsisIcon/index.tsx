import { ComponentProps } from "react";

const DEFAULT_SIZE = 24;

interface EllipsisIconProps
  extends Omit<ComponentProps<"svg">, "width" | "height"> {
  size?: number;
}

export default function EllipsisIcon({
  size = DEFAULT_SIZE,
  ...props
}: EllipsisIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
