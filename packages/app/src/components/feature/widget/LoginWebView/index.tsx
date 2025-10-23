import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { router } from "expo-router";

const LoginWebView = () => {
  const { setAccessToken, setRefreshToken, setAccessTokenExpiredTime } =
    useTokenStore();

  return (
    <WebViewWithInjected
      source={{ uri: PATH_ROUTE.WEBVIEW.KAKAO_LOGIN }}
      onMessage={({ method, name, body }) => {
        if (name === "put-token" && method === "POST") {
          if (
            !body ||
            typeof body !== "object" ||
            !("accessToken" in body) ||
            !("refreshToken" in body) ||
            !("expiredTime" in body) ||
            typeof body.accessToken !== "string" ||
            typeof body.refreshToken !== "string" ||
            typeof body.expiredTime !== "number"
          ) {
            console.error("Invalid token data received");
            return {
              name: "put-token",
              status: "error",
              message: "Invalid token data received",
            };
          }
          const { accessToken, refreshToken, expiredTime } = body;

          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          setAccessTokenExpiredTime(expiredTime);

          router.dismissAll();
          router.replace("/");
        }
      }}
      loadingBar
    />
  );
};

export default LoginWebView;
