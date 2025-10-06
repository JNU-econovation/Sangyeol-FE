import { useProfileModalFormContext } from "@hooks/feature/form/useProfileModalForm";
import TextAreaField from "@shared/ui/TextareaField";
import { Controller } from "react-hook-form";

const HeightField = () => {
  const { watch } = useProfileModalFormContext();

  return (
    <Controller
      name="height"
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="키"
          titleSize={16}
          titleSpacing={4}
          titleWeight="semibold"
          value={value}
          onChangeText={onChange}
          helperText={
            watch("heightHelperState") === "necessary"
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

export default HeightField;
