import { useMyProfileFormContext } from "@hooks/feature/form/useMyProfileForm";
import TextField from "@shared/ui/TextField";

const EtcField = () => {
  const { setValue, watch } = useMyProfileFormContext();

  return (
    <TextField
      label="기타 사항"
      subtitle="지병이나 복용 중인 약이 있다면 작성해주세요."
      placeholder="추가 정보를 입력해주세요."
      color="white"
      value={watch("etc") || ""}
      onChange={(e) => setValue("etc", e.target.value)}
    />
  );
};

export default EtcField;
