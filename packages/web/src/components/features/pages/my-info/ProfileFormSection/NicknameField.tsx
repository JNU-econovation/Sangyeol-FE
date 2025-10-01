import { useMyProfileFormContext } from "@/hooks/feature/form/useMyProfileForm";
import TextField from "@shared/ui/TextField";

const NicknameField = () => {
  const { watch, setValue } = useMyProfileFormContext();

  return (
    <TextField
      label="닉네임"
      value={watch("nickname")}
      onChange={(e) => setValue("nickname", e.target.value)}
    />
  );
};

export default NicknameField;
