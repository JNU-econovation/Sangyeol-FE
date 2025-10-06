import WheelPickerTextareaField from "@entities/WheelPickerTextareaField";

const BLOOD_TYPES = ["A", "B", "AB", "O"] as const;

interface BloodPickerProps {
  value: (typeof BLOOD_TYPES)[number];
  onChange: (value: (typeof BLOOD_TYPES)[number]) => void;
}

const BloodPicker = ({ value, onChange }: BloodPickerProps) => {
  return (
    <WheelPickerTextareaField
      options={[
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "AB", value: "AB" },
        { label: "O", value: "O" },
      ]}
      placeholder="혈액형 선택"
      onChange={(value) => onChange(value)}
      value={value}
    />
  );
};

export default BloodPicker;
