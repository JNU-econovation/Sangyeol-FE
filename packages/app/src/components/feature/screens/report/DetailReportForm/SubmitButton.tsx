import { useDetailReportFormContext } from "@hooks/feature/form/useDetailReportForm";
import useDetailReportSMS from "@hooks/feature/sms/useDetailReportSMS";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { useReportPositionStore } from "@store/report/useReportPositionStore";

const SubmitButton = () => {
  const { watch } = useDetailReportFormContext();
  const { reportPosition } = useReportPositionStore();

  const { goSMS, isLoading, sendStatus } = useDetailReportSMS({
    content: watch("reportContent"),
    lat: reportPosition?.latitude || 0,
    lng: reportPosition?.longitude || 0,
    reporterName: "익명",
    reporterPhone: "000-0000-0000",
    attachment: watch("attachments"),
    enable: true,
  });

  const handleSubmit = () => goSMS();

  return (
    <DefaultButton
      title="신고하기"
      fullWidth
      onPress={handleSubmit}
      disabled={isLoading || sendStatus === "sent"}
    />
  );
};

export default SubmitButton;
