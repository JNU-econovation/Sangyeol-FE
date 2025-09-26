import useSMS from "@hooks/common/useSMS";
import useReportResultModal from "@hooks/feature/modal/useReportResultModal";

const reportNumber = process.env.EXPO_PUBLIC_REPORT_NUMBER;

interface ReportMessageParams {
  lng: number;
  lat: number;
}

const REPORT_MESSAGE = ({ lng, lat }: ReportMessageParams) =>
  `[산결] 긴급 신고 위치 안내
경도 : ${lng}
위도 : ${lat}`;

interface UseReportSMSProps {
  lat: number;
  lng: number;
  enable?: boolean;
}

const useReportSMS = ({ lat, lng, enable }: UseReportSMSProps) => {
  const { showReportResult } = useReportResultModal();

  if (!reportNumber) {
    throw new Error("신고하기 번호가 설정되지 않았습니다.");
  }

  return useSMS({
    addresses: reportNumber,
    message: REPORT_MESSAGE({ lng, lat }),
    enable,
    onSuccess: () => {
      showReportResult();
    },
  });
};

export default useReportSMS;
