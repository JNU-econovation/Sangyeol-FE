import { InputHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

export const InputVariants = cva(`rounded-lg`, {
  variants: {
    color: {
      primary: "bg-input-gray",
      white: "bg-white border border-gray-300",
    },
    size: {
      primary: "w-full p-3",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "primary",
  },
});

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "color" | "size">,
    VariantProps<typeof InputVariants> {
  className?: string;
}

export function Input({ className, size, color, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(InputVariants({ color, size }), className)}
    />
  );
}

export default Input;
