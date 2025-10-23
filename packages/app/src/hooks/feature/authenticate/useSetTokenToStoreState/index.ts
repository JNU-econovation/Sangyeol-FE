import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { getValueFromSecureStore } from "@utils/secureStore";
import { useEffect, useState } from "react";

/**
 * 앱 초반에 secure store에 저장된 토큰을 Zustand 스토어 상태와 동기화하는 훅
 */
const useSetTokenToStoreState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { setAccessToken, setRefreshToken } = useTokenStore();

  // 처음 렌더링 될 때, 로그인 상태 확인
  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getValueFromSecureStore("accessToken");
        const refreshToken = await getValueFromSecureStore("refreshToken");
        if (accessToken && refreshToken) {
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
        }
      } catch (error) {
        console.error("[global index] Error checking login status:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setAccessToken, setRefreshToken]);

  return { isLoading, error };
};

export default useSetTokenToStoreState;
