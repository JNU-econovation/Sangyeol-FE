import { useDetailReportFormContext } from "@hooks/feature/form/useDetailReportForm";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { useDetailReportSMSStore } from "@store/report/useDetailReportSMSStore";
import { router } from "expo-router";

const SubmitButton = () => {
  const { watch } = useDetailReportFormContext();
  const { setSMSContent } = useDetailReportSMSStore();

  console.log(watch("reportLocation"));

  const handleSubmit = () => {
    setSMSContent({
      content: watch("reportContent"),
      lat: watch("reportLocation")?.latitude || 0,
      lng: watch("reportLocation")?.longitude || 0,
      reporterName: watch("reporterName"),
      reporterPhone: watch("reporterPhone"),
      attachment: watch("attachments"),
      enable:
        watch("reportContent").trim().length > 0 && !!watch("reportLocation"),
    });

    router.push("/report/reportTerm");
  };

  const checkIsDisabled = () => {
    const reportContent = watch("reportContent");
    const reporterName = watch("reporterName");
    const reporterPhone = watch("reporterPhone");
    const reportPosition = watch("reportLocation");

    if (
      reportContent.trim().length === 0 ||
      reporterName.trim().length === 0 ||
      reporterPhone.trim().length === 0 ||
      !reportPosition
    ) {
      return true;
    }

    return false;
  };

  return (
    <DefaultButton
      title="신고하기"
      fullWidth
      onPress={handleSubmit}
      disabled={checkIsDisabled()}
    />
  );
};

export default SubmitButton;
