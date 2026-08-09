import { ComponentProps } from "react";

const DEFAULT_SIZE = 24;

interface NavigationIconProps
  extends Omit<ComponentProps<"svg">, "width" | "height"> {
  size?: number;
}

export default function NavigationIcon({
  size = DEFAULT_SIZE,
  ...props
}: NavigationIconProps) {
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
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}
