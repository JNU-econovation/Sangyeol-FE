import { ComponentProps, JSX } from "react";

import Spacing from "@shared/layout/Spacing";
// import Input from "@shared/ui/Input";
import { cn } from "../../../../../utils/cn/index";

interface TextFieldProps extends ComponentProps<"input"> {
  label: string;
  subtitle?: string;
  right?: JSX.Element;
}

export default function TextField({
  label,
  subtitle,
  right,
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
        {/* <Input {...inputProps} /> */}
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
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            {right}
          </div>
        )}
      </div>
    </>
  );
}
