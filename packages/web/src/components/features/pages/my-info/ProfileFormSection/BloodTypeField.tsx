import { useMyProfileFormContext } from "@hooks/feature/form/useMyProfileForm";
import TextField from "@shared/ui/TextField";

const BloodTypeField = () => {
  const { setValue, watch } = useMyProfileFormContext();

  return (
    <TextField
      label="혈액형"
      placeholder="B"
      color="white"
      value={watch("bloodType")}
      onChange={(e) => {
        //TODO: select box로 변경
        setValue("bloodType", e.target.value);
      }}
    />
  );
};

export default BloodTypeField;
