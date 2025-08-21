import * as SMS from "expo-sms";
import { useEffect, useState } from "react";

interface UseSMSProps {
  addresses: string | string[];
  message: string;
  options?: SMS.SMSOptions;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
  enable?: boolean;
}

const useSMS = ({
  addresses,
  message,
  options,
  onSuccess,
  onCancel,
  onError,
  enable,
}: UseSMSProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [sendStatus, setSendStatus] = useState<
    "sent" | "cancelled" | "failed" | null
  >(null);

  const goSMS = () => {
    if (!enable) return;
    (async () => {
      try {
        const isAvailable = await SMS.isAvailableAsync();
        setIsLoading(true);

        if (isAvailable) {
          setIsAvailable(true);
          const { result } = await SMS.sendSMSAsync(
            addresses,
            message,
            options,
          );

          if (result === "sent") {
            console.log("SMS sent successfully");
            setSendStatus("sent");
            onSuccess?.();
          }
          if (result === "cancelled") {
            console.log("SMS sending was cancelled");
            setSendStatus("cancelled");
            onCancel?.();
          } else {
            console.log("SMS sending failed");
            setSendStatus("failed");
            onError?.(new Error("SMS sending failed"));
            setError(new Error("SMS sending failed"));
          }
        } else {
          // 해당 기기에서 SMS를 사용할 수 없습니다.
          console.error("SMS is not available on this device");
          setIsAvailable(false);
          setError(new Error("SMS is not available on this device"));
          onError?.(new Error("SMS is not available on this device"));
        }
      } catch (err) {
        console.error("Error sending SMS:", err);
        setError(err as Error);
        onError?.(err as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return {
    isLoading,
    isAvailable,
    sendStatus,
    goSMS,
    error,
  };
};

export default useSMS;
