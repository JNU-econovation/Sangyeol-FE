import { useMyProfileFormContext } from "@shared/hooks/domain/form/useMyProfileForm";
import TextField from "@shared/components/primitives/ui/TextField";
import * as z from "zod";

export type EmailHelperState = "FIT" | "INVALID" | "DUPLICATED";

const emailSchema = z.string().email("올바른 이메일 주소를 입력해 주세요.");

const EmailField = () => {
  const { watch, setValue } = useMyProfileFormContext();

  const checkEmail = (email: string) => {
    const result = emailSchema.safeParse(email);

    if (result.success) {
      setValue("emailFieldHelperState", "FIT");
      return;
    }

    setValue("emailFieldHelperState", "INVALID");
  };

  return (
    <TextField
      label="이메일"
      type="email"
      placeholder="test@naver.com"
      color="white"
      value={watch("email")}
      helperText={
        watch("emailFieldHelperState") === "INVALID"
          ? "올바른 이메일 주소를 입력해 주세요."
          : watch("emailFieldHelperState") === "DUPLICATED"
            ? "이미 가입된 이메일입니다."
            : ""
      }
      onChange={(e) => {
        setValue("email", e.target.value);
        checkEmail(e.target.value);
      }}
    />
  );
};

export default EmailField;
