import { COLORS } from "@styles/colorPalette";

import TextAreaField from "@components/common/shared/ui/TextareaField";
import HELPER from "@constants/inputField/helper";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
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
          placeholder="입력하기"
          backgroundColor="inputGray"
          borderColor="inputGray"
          paddingVertical={16}
          placeholderTextColor={COLORS.subGray}
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
