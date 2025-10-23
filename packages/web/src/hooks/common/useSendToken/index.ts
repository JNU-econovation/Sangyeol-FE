import useRouteBackBridge from "@/hooks/feature/bridge/useRouteBackBridge";
import { useBridge } from "bridge/web";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useSendToken = () => {
  const searchParams = useSearchParams();
  const { request } = useBridge();

  const goBack = useRouteBackBridge();

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const accessTokenExpiredTime = searchParams.get("accessTokenExpiredTime");

  useEffect(() => {
    if (!accessToken || !refreshToken || !accessTokenExpiredTime) {
      console.error("Missing token parameters");
      return;
    }

    const expiredTime = accessTokenExpiredTime
      ? Number(accessTokenExpiredTime)
      : undefined;

    if (expiredTime === undefined || isNaN(expiredTime)) {
      console.error("Invalid accessTokenExpiredTime");
      return;
    }

    request({
      requestMessage: {
        name: "put-token",
        method: "POST",
        body: {
          accessToken,
          refreshToken,
          accessTokenExpiredTime: expiredTime,
        },
      },
    });
    goBack();
  }, [accessToken, accessTokenExpiredTime, goBack, refreshToken, request]);
};

export default useSendToken;
