import { ComponentProps } from "react";

const DEFAULT_SIZE = 24;

interface MountainIconProps
  extends Omit<ComponentProps<"svg">, "width" | "height"> {
  size?: number;
}

export default function MountainIcon({
  size = DEFAULT_SIZE,
  ...props
}: MountainIconProps) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
