import { useMyProfileFormContext } from "@hooks/feature/form/useMyProfileForm";
import TextField from "@shared/ui/TextField";

const WeightField = () => {
  const { watch, setValue } = useMyProfileFormContext();

  return (
    <TextField
      label="몸무게"
      placeholder="100"
      color="white"
      value={watch("weight")}
      type="number"
      onChange={(e) => setValue("weight", +e.target.value)} //TODO: 타입 안정성 챙기기 string -> number
    />
  );
};

export default WeightField;
