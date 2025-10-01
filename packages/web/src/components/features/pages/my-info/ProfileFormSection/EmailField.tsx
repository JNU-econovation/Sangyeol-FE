import { useMyProfileFormContext } from "@/hooks/feature/form/useMyProfileForm";
import TextField from "@shared/ui/TextField";

const EmailField = () => {
  const { watch, setValue } = useMyProfileFormContext();

  return (
    <TextField
      label="이메일"
      type="email"
      placeholder="test@naver.com"
      color="white"
      value={watch("email")}
      onChange={(e) => setValue("email", e.target.value)}
    />
  );
};

export default EmailField;
