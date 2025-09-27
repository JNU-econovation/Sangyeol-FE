import useSMS from "@hooks/common/useSMS";

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
  attachment: string[];
  enable?: boolean;
}

const REPORT_NUMBER = process.env.EXPO_PUBLIC_REPORT_NUMBER;

const useDetailReportSMS = ({
  lat,
  lng,
  content,
  reporterName,
  reporterPhone,
  attachment,
  enable,
}: UseDetailReportSMSProps) => {
  if (!REPORT_NUMBER) {
    throw new Error("신고하기 번호가 설정되지 않았습니다.");
  }

  const attachments = attachment?.map((uri, index) => ({
    filename: uri || `attachment_${index}`,
    mimeType: "image/jpeg",
    uri,
  }));

  console.log("attachments", attachments);

  return useSMS({
    addresses: REPORT_NUMBER,
    message: REPORT_MESSAGE({ lng, lat, content, reporterName, reporterPhone }),
    enable,
    options: attachments
      ? {
          attachments: attachments,
        }
      : undefined,
  });
};

export default useDetailReportSMS;
