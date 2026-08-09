import { ComponentProps } from "react";

const DEFAULT_SIZE = 24;

interface ArrowRightIconProps
  extends Omit<ComponentProps<"svg">, "width" | "height"> {
  size?: number;
}

export default function ArrowRightIcon({
  size = DEFAULT_SIZE,
  ...props
}: ArrowRightIconProps) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
