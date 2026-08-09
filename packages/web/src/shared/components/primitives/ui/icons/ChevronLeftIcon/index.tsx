import { ComponentProps } from "react";

const DEFAULT_SIZE = 24;

interface ChevronLeftIconProps
  extends Omit<ComponentProps<"svg">, "width" | "height"> {
  size?: number;
}

export default function ChevronLeftIcon({
  size = DEFAULT_SIZE,
  ...props
}: ChevronLeftIconProps) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
