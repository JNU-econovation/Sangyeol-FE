import { useProfileModalFormContext } from "@hooks/feature/form/useProfileModalForm";
import TextAreaField from "@shared/ui/TextareaField";
import { Controller } from "react-hook-form";

const WeightField = () => {
  const { watch } = useProfileModalFormContext();

  return (
    <Controller
      name="weight"
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="몸무게"
          titleSize={16}
          titleSpacing={4}
          titleWeight="semibold"
          value={value}
          onChangeText={onChange}
          helperText={
            watch("weightHelperState") === "necessary"
              ? "필수 입력 사항입니다."
              : ""
          }
          helperTextProps={{ color: "error" }}
          keyboardType="numeric"
        />
      )}
    />
  );
};

export default WeightField;
