import { useMyProfileFormContext } from "@/hooks/feature/form/useMyProfileForm";
import TextField from "@shared/ui/TextField";

const HeightField = () => {
  const { setValue, watch } = useMyProfileFormContext();

  return (
    <TextField
      label="키"
      placeholder="100"
      color="white"
      value={watch("height")}
      type="number"
      onChange={(e) => setValue("height", +e.target.value)} //TODO: 타입 안정성 챙기기 string -> number
    />
  );
};

export default HeightField;
