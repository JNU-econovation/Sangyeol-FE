import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import useLogout from "@hooks/feature/useLogout";

const MypageHomeWebview = () => {
  const { logout } = useLogout();

  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.MYPAGE,
      }}
      onMessage={async ({ method, name }) => {
        try {
          if (name === "logout" && method === "DELETE") {
            await logout();
            return {
              name,
              status: "success",
            };
          }
        } catch (error) {
          console.error("Logout failed:", error);
          return {
            name,
            status: "error",
          };
        }
      }}
    />
  );
};

export default MypageHomeWebview;
