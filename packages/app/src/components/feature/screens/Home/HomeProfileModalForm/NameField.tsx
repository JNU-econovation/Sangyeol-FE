import { useProfileModalFormContext } from "@hooks/feature/form/useProfileModalForm";
import TextAreaField from "@shared/ui/TextareaField";
import { Controller } from "react-hook-form";

const NameField = () => {
  const { watch } = useProfileModalFormContext();
  return (
    <Controller
      name="name"
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="이름"
          titleSize={16}
          titleSpacing={4}
          titleWeight="semibold"
          value={value}
          onChangeText={onChange}
          helperText={
            watch("nameHelperState") === "necessary"
              ? "필수 입력 사항입니다."
              : ""
          }
          helperTextProps={{ color: "error" }}
        />
      )}
    />
  );
};

export default NameField;
