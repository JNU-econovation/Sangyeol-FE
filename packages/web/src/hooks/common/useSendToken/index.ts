import useRouteBackBridge from "@/hooks/feature/bridge/useRouteBackBridge";
import useShowToastBridge from "@/hooks/feature/bridge/useShowToastBridge";
import { useBridge } from "@geongyu/bridge/web";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useSendToken = () => {
  const searchParams = useSearchParams();
  const { request } = useBridge();

  const goBack = useRouteBackBridge();
  const showToast = useShowToastBridge();

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const expiredTime = searchParams.get("expiredTime");

  useEffect(() => {
    if (!accessToken || !refreshToken || !expiredTime) {
      console.error("Missing token parameters");
      showToast({
        type: "error",
        text1: "카카오 로그인 실패",
        text2: "시스템상 문제가 발생했습니다. 다시 시도해주세요.",
      });
      goBack();
      return;
    }

    if (expiredTime === undefined || isNaN(+expiredTime)) {
      console.error("Invalid accessTokenExpiredTime");
      showToast({
        type: "error",
        text1: "카카오 로그인 실패",
        text2: "시스템상 문제가 발생했습니다. 다시 시도해주세요.",
      });
      goBack();
      return;
    }

    request({
      requestMessage: {
        name: "put-token",
        method: "POST",
        body: {
          accessToken,
          refreshToken,
          expiredTime,
        },
      },
    });
    goBack();
  }, [accessToken, expiredTime, goBack, refreshToken, request]);
};

export default useSendToken;
