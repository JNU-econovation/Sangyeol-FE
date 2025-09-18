import useSMS from "@hooks/common/useSMS";

const reportNumber = process.env.EXPO_PUBLIC_REPORT_NUMBER;

const REPORT_MESSAGE = ({
  lng,
  lat,
}: {
  lng: number;
  lat: number;
}) => `[산결] 긴급 신고 위치 안내
경도 : ${lng}
위도 : ${lat}`;

interface UseReportSMSProps {
  lat: number;
  lng: number;
  enable?: boolean;
}

const useReportSMS = ({ lat, lng, enable }: UseReportSMSProps) => {
  if (!reportNumber) {
    throw new Error("신고하기 번호가 설정되지 않았습니다.");
  }

  return useSMS({
    addresses: reportNumber,
    message: REPORT_MESSAGE({ lng, lat }),
    enable,
  });
};

export default useReportSMS;
