import { useDetailReportFormContext } from "@hooks/feature/form/useDetailReportForm";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { useDetailReportSMSStore } from "@store/report/useDetailReportSMSStore";
import { useReportPositionStore } from "@store/report/useReportPositionStore";
import { router } from "expo-router";

const SubmitButton = () => {
  const { watch } = useDetailReportFormContext();
  const { reportPosition } = useReportPositionStore();
  const { setSMSContent } = useDetailReportSMSStore();

  const handleSubmit = () => {
    setSMSContent({
      content: watch("reportContent"),
      lat: reportPosition?.latitude || 0,
      lng: reportPosition?.longitude || 0,
      reporterName: watch("reporterName"),
      reporterPhone: watch("reporterPhone"),
      attachment: watch("attachments"),
      enable: watch("reportContent").trim().length > 0 && !!reportPosition,
    });

    router.push("/report/reportTerm");
  };

  const checkIsDisabled = () => {
    const reportContent = watch("reportContent");
    const reporterName = watch("reporterName");
    const reporterPhone = watch("reporterPhone");
    const reportPosition = useReportPositionStore.getState().reportPosition;

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
