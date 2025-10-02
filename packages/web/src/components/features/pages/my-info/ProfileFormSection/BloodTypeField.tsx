import { useMyProfileFormContext } from "@hooks/feature/form/useMyProfileForm";
import Spacing from "@shared/layout/Spacing";
import BloodTypeWheelPickerInput from "@widgets/etc/BloodTypeWheelPickerInput";

const BloodTypeField = () => {
  const { setValue, watch } = useMyProfileFormContext();

  return (
    <>
      <span className="font-bold">혈액형</span>
      <Spacing size={2} />
      <BloodTypeWheelPickerInput
        value={watch("bloodType")}
        onChange={(value) => setValue("bloodType", value)}
        placeholder="혈액형을 선택하세요"
      />
    </>
  );
};

export default BloodTypeField;
