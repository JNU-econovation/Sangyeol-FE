import { useMyProfileFormContext } from "@shared/hooks/domain/form/useMyProfileForm";
import Spacing from "@shared/components/primitives/layout/Spacing";
import BloodTypeWheelPickerInput from "@modules/features/etc/BloodTypeWheelPickerInput";

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
