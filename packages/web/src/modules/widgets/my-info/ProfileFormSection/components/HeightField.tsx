import { useMyProfileFormContext } from "@shared/hooks/domain/form/useMyProfileForm";
import TextField from "@shared/components/primitives/ui/TextField";

const HeightField = () => {
  const { setValue, watch } = useMyProfileFormContext();

  return (
    <TextField
      label="키"
      placeholder="100"
      color="white"
      value={watch("height")?.toString() ?? ""}
      type="tel"
      maxLength={3}
      onChange={(e) => {
        const nextValue = e.target.value;

        if (nextValue === "") {
          setValue("height", undefined, { shouldDirty: true });
          return;
        }

        const parsedValue = Number(nextValue);

        if (!Number.isNaN(parsedValue)) {
          setValue("height", parsedValue, { shouldDirty: true });
        }
      }}
      right={<span className="text-gray-900 text-lg">cm</span>}
    />
  );
};

export default HeightField;
