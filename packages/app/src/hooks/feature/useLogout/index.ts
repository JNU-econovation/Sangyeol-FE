import { useTokenStore } from "@/src/store/secureStorage/useTokenStore";
import { removeValueFromSecureStore } from "@utils/secureStore";

const useLogout = () => {
  const { clearTokens } = useTokenStore();

  const logout = async () => {
    try {
      await removeValueFromSecureStore("accessToken");
      clearTokens();
      console.log("[useLogout] 로그아웃 성공");
    } catch (error) {
      console.error("[useLogout] 로그아웃 중 에러 발생:", error);
      throw error;
    }
  };

  return { logout };
};

export default useLogout;
