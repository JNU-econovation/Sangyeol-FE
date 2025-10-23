import WheelPickerTextareaField from "@entities/WheelPickerTextareaField";
import { ComponentProps } from "react";

const BLOOD_TYPES = ["A", "B", "AB", "O"] as const;

interface BloodPickerProps
  extends Omit<
    ComponentProps<typeof WheelPickerTextareaField>,
    "title" | "options"
  > {
  value: (typeof BLOOD_TYPES)[number];
  onChange: (value: (typeof BLOOD_TYPES)[number]) => void;
}

const BloodPicker = ({ value, onChange }: BloodPickerProps) => {
  return (
    <WheelPickerTextareaField
      title="혈액형"
      options={[
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "AB", value: "AB" },
        { label: "O", value: "O" },
      ]}
      placeholder="혈액형 선택"
      onChange={onChange}
      value={value}
    />
  );
};

export default BloodPicker;
