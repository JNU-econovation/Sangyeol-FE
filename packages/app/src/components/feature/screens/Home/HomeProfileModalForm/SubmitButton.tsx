import DefaultButton from "@components/common/shared/ui/buttons/DefaultButton";
import { useProfileModalFormContext } from "@hooks/feature/form/useProfileModalForm";
import { useCallback } from "react";

const SubmitButton = () => {
  const { watch, setValue } = useProfileModalFormContext();
  const handleConfirm = useCallback(() => {
    const name = watch("name");
    const weight = watch("weight");
    const height = watch("height");
    const bloodType = watch("bloodType");

    if (!name) {
      setValue("nameHelperState", "necessary");
    } else {
      setValue("nameHelperState", "none");
    }

    if (!weight) {
      setValue("weightHelperState", "necessary");
    } else {
      setValue("weightHelperState", "none");
    }

    if (!height) {
      setValue("heightHelperState", "necessary");
    } else {
      setValue("heightHelperState", "none");
    }
    if (!bloodType) {
      setValue("bloodTypeHelperState", "necessary");
    } else {
      setValue("bloodTypeHelperState", "none");
    }

    if (!name || !weight || !height || !bloodType) {
      return;
    }

    // Submit the form
  }, [watch]);
  return <DefaultButton title="확인" onPress={handleConfirm} fullWidth />;
};

export default SubmitButton;
