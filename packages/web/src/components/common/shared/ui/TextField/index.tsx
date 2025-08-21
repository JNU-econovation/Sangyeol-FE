import { InputHTMLAttributes, JSX } from "react";

import Spacing from "@shared/layout/Spacing";
import Input from "@shared/ui/Input";
import Text from "@shared/ui/Text";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "color" | "size"> {
  label: string;
  right?: JSX.Element;
  color?: "primary" | "white";
  size?: "primary";
}

export default function TextField({
  label,
  right,
  ...restProps
}: TextFieldProps) {
  return (
    <>
      <Text fontWeight="font-bold">{label}</Text>
      <Spacing size={1} />
      <div className="relative">
        <Input {...restProps} />
        {right && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            {right}
          </div>
        )}
      </div>
    </>
  );
}
