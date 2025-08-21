import useRouteBackBridge from "@/hooks/feature/bridge/useRouteBackBridge";
import { useBridge } from "@/service/bridge";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useSendToken = () => {
  const searchParams = useSearchParams();
  const { request } = useBridge();

  const goBack = useRouteBackBridge();

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const expiredTime = searchParams.get("expiredTime");

  useEffect(() => {
    if (!accessToken && !refreshToken) return;

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
