import { COLORS } from "@styles/colorPalette";

import HELPER from "@constants/inputField/helper";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import Text from "@shared/ui/Text";
import TextAreaField from "@shared/ui/TextareaField";
import { Controller } from "react-hook-form";
import { z } from "zod";

const emailSchema = z.string().email("올바른 이메일 주소를 입력해 주세요.");

const EmailField = () => {
  const { control, setValue, watch } = useProfileSetFormContext();

  const checkEmail = (email: string) => {
    const result = emailSchema.safeParse(email);

    if (email.length === 0) {
      setValue("emailFieldHelperState", "NONE");
      return;
    }

    if (result.success) {
      setValue("emailFieldHelperState", "FIT");
      return;
    }

    setValue("emailFieldHelperState", "INVALID");
  };

  return (
    <Controller
      name="email"
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="이메일"
          titleSpacing={0}
          titleSize={18}
          titleSideComponent={<Text color="red">*</Text>}
          backgroundColor="gray300"
          borderColor="gray300"
          paddingVertical={16}
          keyboardType="email-address"
          placeholderTextColor={COLORS.gray600}
          helperText={HELPER.PROFILE_FORM.EMAIL[watch("emailFieldHelperState")]}
          onChangeText={(email) => {
            checkEmail(email);
            onChange(email);
          }}
          value={value}
          helperTextProps={{
            color: "error",
          }}
        />
      )}
    />
  );
};

export default EmailField;
