import { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@shared/lib/cn";

export const ButtonVariants = cva(
  `rounded-xl shrink-0 active:opacity-95 active:scale-[99%] transition-all duration-200`,
  {
    variants: {
      color: {
        green: "bg-primary text-white",
        kakaoYellow: "bg-kakao-yellow text-black",
        black: "bg-black text-white",
        white: "bg-white text-black",
        gray: "bg-gray-800 text-white",
      },
      size: {
        lg: "px-4 py-2 font-bold text-lg",
        md: "px-5 py-2.5 text-base font-semibold",
        sm: "px-4 py-2 text-sm font-semibold",
      },
      fullWidth: {
        true: "w-full p-3 text-center grow",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      color: "green",
      size: "lg",
      fullWidth: false,
    },
  },
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "size">,
    VariantProps<typeof ButtonVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Button({
  className,
  children,
  color,
  size,
  fullWidth,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        ButtonVariants({ color, size, className, fullWidth, disabled }),
      )}
    >
      {children}
    </button>
  );
}

export default Button;
