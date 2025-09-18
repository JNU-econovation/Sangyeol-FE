import useSMS from "@hooks/common/useSMS";

const reportNumber = process.env.EXPO_PUBLIC_REPORT_NUMBER;

const REPORT_MESSAGE = ({
  lng,
  lat,
  content,
  reporterName,
  reporterPhone,
}: {
  lng: number;
  lat: number;
  content: string;
  reporterName: string;
  reporterPhone: string;
}) => `[산결] 상세 신고
신고 내용: ${content}
신고자: ${reporterName}
연락처: ${reporterPhone}
위치: 경도 ${lng}, 위도 ${lat}`;

interface UseDetailReportSMSProps {
  lat: number;
  lng: number;
  content: string;
  reporterName: string;
  reporterPhone: string;
  enable?: boolean;
}

const REPORT_NUMBER = process.env.EXPO_PUBLIC_REPORT_NUMBER;

const useDetailReportSMS = ({
  lat,
  lng,
  content,
  reporterName,
  reporterPhone,
  enable,
}: UseDetailReportSMSProps) => {
  if (!REPORT_NUMBER) {
    throw new Error("신고하기 번호가 설정되지 않았습니다.");
  }

  return useSMS({
    addresses: REPORT_NUMBER,
    message: REPORT_MESSAGE({ lng, lat, content, reporterName, reporterPhone }),
    enable,
    options: {
      attachments: [
        {
          filename: "report_detail.txt",
          mimeType: "text/plain",
          uri: `data:text/plain;base64,${btoa(`신고 내용: ${content}\n신고자: ${reporterName}\n연락처: ${reporterPhone}\n경도: ${lng}\n위도: ${lat}`)}`,
        },
      ],
    },
  });
};

export default useDetailReportSMS;
