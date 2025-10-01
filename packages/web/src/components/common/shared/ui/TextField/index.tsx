import { cn } from "@/utils/cn/index";
import Spacing from "@shared/layout/Spacing";
import { ComponentProps, JSX } from "react";

interface TextFieldProps extends ComponentProps<"input"> {
  label: string;
  subtitle?: string;
  right?: JSX.Element;
  helperText?: string;
}

export default function TextField({
  label,
  subtitle,
  right,
  helperText,
  ...inputProps
}: TextFieldProps) {
  return (
    <>
      <div className="flex items-end gap-2">
        <span className="font-bold">{label}</span>
        {subtitle && (
          <span className="text-gray-900 text-xs font-normal">{subtitle}</span>
        )}
      </div>
      <Spacing size={2} />
      <div className="relative">
        <input
          className={cn(
            "rounded-lg bg-white border border-gray-300 w-full p-3",
            {
              "text-gray-800": inputProps.disabled,
            },
          )}
          {...inputProps}
        />

        {right && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {right}
          </div>
        )}
      </div>
      {helperText && (
        <>
          <Spacing size={1} />
          <div className="text-sm font-medium text-error">{helperText}</div>
        </>
      )}
    </>
  );
}
