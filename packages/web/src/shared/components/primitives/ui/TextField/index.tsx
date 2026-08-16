import { cn } from "@shared/utils/cn/index";
import Spacing from "@shared/components/primitives/layout/Spacing";
import { ComponentProps, JSX } from "react";

interface TextFieldProps extends ComponentProps<"input"> {
  label: string;
  subtitle?: string;
  titleSideComponent?: JSX.Element;
  right?: JSX.Element;
  left?: JSX.Element;
  paddingInline?: number;
  paddingLeft?: number;
  paddingRight?: number;
  helperText?: string;
}

export default function TextField({
  label,
  titleSideComponent,
  subtitle,
  left,
  right,
  helperText,
  paddingLeft,
  paddingRight,
  paddingInline,
  ...inputProps
}: TextFieldProps) {
  return (
    <>
      <div className="flex items-end gap-2">
        <span className="font-bold">{label}</span>
        {titleSideComponent && titleSideComponent}
        {subtitle && (
          <span className="text-gray-900 text-xs font-normal">{subtitle}</span>
        )}
      </div>
      <Spacing size={2} />

      <div className="relative">
        {left && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2">{left}</div>
        )}
        <input
          className={cn(
            "rounded-lg bg-white border border-gray-300 w-full p-3",
            {
              "text-gray-800": inputProps.disabled,
            },
          )}
          style={{
            paddingLeft: paddingLeft ? paddingLeft * 0.25 + "rem" : undefined,
            paddingRight: paddingRight
              ? paddingRight * 0.25 + "rem"
              : undefined,
            paddingInline: paddingInline
              ? paddingInline * 0.25 + "rem"
              : undefined,
          }}
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
