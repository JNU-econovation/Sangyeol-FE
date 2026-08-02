import { useProfileModalFormContext } from "@hooks/feature/form/useProfileModalForm";
import BloodPicker from "@widget/BloodPicker";

const BloodTypeField = () => {
  const { watch, setValue } = useProfileModalFormContext();
  return (
    <BloodPicker
      value={watch("bloodType")}
      onChange={(value) => {
        setValue("bloodType", value);
      }}
    />
  );
};

export default BloodTypeField;
