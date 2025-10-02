"use client";

import WheelPickerInput, {
  WheelPickerOption,
} from "@entities/WheelPickerInput";
import { ComponentProps, useMemo } from "react";

type BloodType = "A" | "B" | "AB" | "O";

interface BloodTypeWheelPickerInputProps
  extends Omit<
    ComponentProps<typeof WheelPickerInput>,
    "options" | "onChange"
  > {
  onChange: (value: BloodType) => void;
}

const BloodTypeWheelPickerInput = (props: BloodTypeWheelPickerInputProps) => {
  const bloodTypeOptions: WheelPickerOption[] = useMemo(
    () => [
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "AB", value: "AB" },
      { label: "O", value: "O" },
    ],
    [],
  );
  return <WheelPickerInput<BloodType> {...props} options={bloodTypeOptions} />;
};

export default BloodTypeWheelPickerInput;
