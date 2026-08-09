import { useMyProfileFormContext } from "@shared/hooks/domain/form/useMyProfileForm";
import TextField from "@shared/components/primitives/ui/TextField";

const WeightField = () => {
  const { watch, setValue } = useMyProfileFormContext();

  return (
    <TextField
      label="몸무게"
      placeholder="100"
      color="white"
      value={watch("weight")}
      type="tel"
      maxLength={3}
      onChange={(e) => {
        const value = parseInt(e.target.value, 10);
        setValue("weight", isNaN(value) ? 0 : value);
      }}
      right={<span className="text-gray-900 text-lg">kg</span>}
    />
  );
};

export default WeightField;
