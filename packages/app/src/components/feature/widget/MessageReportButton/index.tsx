import useGetCurrentPosition from "@hooks/feature/useGetCurrentPosition";
import useReportSMS from "@hooks/feature/useReportSMS";
import DefaultButton from "@shared/ui/buttons/DefaultButton";

const MessageReportButton = () => {
  const { location, isLoading: getPositionLoading } = useGetCurrentPosition();
  const { isLoading: SMSLoading, goSMS } = useReportSMS({
    lat: location?.coords.latitude ?? 0,
    lng: location?.coords.longitude ?? 0,
    enable: !getPositionLoading && location?.coords != null,
  });

  return (
    <DefaultButton
      title="동의하고 전송하기"
      color="mainWhite"
      disabled={getPositionLoading || SMSLoading || !location?.coords}
      onPress={goSMS}
    />
  );
};

export default MessageReportButton;
