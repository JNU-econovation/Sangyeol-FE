import { useAppForm } from "@service/form/hooks";
import { formOptions } from "@tanstack/react-form";
import { useState, useEffect } from "react";
import useSMS from "@hooks/common/useSMS";
import { useReportPositionStore } from "@store/report/useReportPositionStore";
import { convertToDMS } from "@utils/coords";

const REPORT_NUMBER = process.env.EXPO_PUBLIC_REPORT_NUMBER;

export const detailReportForm = formOptions({
  defaultValues: {
    content: "",
    attachments: [],
    address: "",
    reporter: {
      name: "",
      phone: "",
    },
  },
});

const useDetailReportForm = () => {
  const { reportPosition } = useReportPositionStore();
  const [smsData, setSmsData] = useState<{
    addresses: string;
    message: string;
    enable: boolean;
    options?: {
      attachments?: Array<{
        uri: string;
        mimeType: string;
        filename: string;
      }>;
    };
  } | null>(null);
  const [smsSent, setSmsSent] = useState(false);

  const sms = useSMS({
    addresses: smsData?.addresses || "",
    message: smsData?.message || "",
    enable: smsData?.enable || false,
    options: smsData?.options,
    onSuccess: () => {
      setSmsData(null);
      setSmsSent(false);
    },
    onError: (error) => {
      console.log("SMS 전송 오류:", error);
      setSmsData(null);
      setSmsSent(false);
    },
    onCancel: () => {
      setSmsData(null);
      setSmsSent(false);
    },
  });

  // smsData가 설정되면 자동으로 SMS 전송 (중복 방지)
  useEffect(() => {
    if (smsData && smsData.enable && !sms.isLoading && !smsSent) {
      setSmsSent(true);
      sms.goSMS();
    }
  }, [smsData, sms.isLoading, smsSent]);

  const form = useAppForm({
    ...detailReportForm,
    validators: {
      onChange: ({ value }) => {
        // console.log("onChange value:", value);
      },
    },
    onSubmit: ({ value }) => {
      if (!REPORT_NUMBER) {
        return;
      }

      if (!reportPosition) {
        return;
      }

      // 첨부파일 처리 - 문자열 배열 처리
      const attachments =
        value.attachments
          ?.filter(
            (fileUri: string) =>
              typeof fileUri === "string" && fileUri.length > 0,
          )
          ?.map((fileUri: string, index: number) => {
            const isVideo =
              fileUri.includes(".mp4") ||
              fileUri.includes(".mov") ||
              fileUri.includes(".avi") ||
              fileUri.includes("video");
            const isImage =
              fileUri.includes(".jpg") ||
              fileUri.includes(".jpeg") ||
              fileUri.includes(".png") ||
              fileUri.includes(".gif") ||
              fileUri.includes("image");

            let mimeType = "application/octet-stream";
            let filename = `attachment_${index + 1}`;

            if (isVideo) {
              mimeType = "video/mp4";
              filename = `video_${index + 1}.mp4`;
            } else if (isImage) {
              mimeType = "image/jpeg";
              filename = `photo_${index + 1}.jpg`;
            }

            return {
              uri: fileUri,
              mimeType,
              filename,
            };
          }) || [];

      const message = `[산결] 상세 신고
신고 내용: ${value.content}
신고자: 홍길동
연락처: 010-0101-0101
위도 ${
        convertToDMS(reportPosition?.latitude, reportPosition?.longitude).split(
          ", ",
        )[0]
      }
경도 ${
        convertToDMS(reportPosition?.latitude, reportPosition?.longitude).split(
          ", ",
        )[1]
      }`;

      setSmsData({
        addresses: REPORT_NUMBER,
        message,
        enable: true,
        options: attachments.length > 0 ? { attachments } : undefined,
      });
    },
  });

  return {
    ...form,
    isSubmitting: sms.isLoading,
  };
};

export default useDetailReportForm;
