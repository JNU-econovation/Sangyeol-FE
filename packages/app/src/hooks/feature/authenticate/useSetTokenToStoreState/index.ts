import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { getValueFromSecureStore } from "@utils/secureStore";
import useReissueMutate from "@hooks/feature/query/mutate/useReissueMutate";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

/**
 * 앱 초반에 secure store에 저장된 refreshToken으로 토큰을 재발급하여
 * Zustand 스토어 상태와 동기화하는 훅
 */
const useSetTokenToStoreState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const {
    setAccessToken,
    setRefreshToken,
    setAccessTokenExpiredTime,
    clearTokens,
  } = useTokenStore();
  const { mutateAsync: reissue } = useReissueMutate();

  useEffect(() => {
    (async () => {
      try {
        const refreshToken = await getValueFromSecureStore("refreshToken");

        if (!refreshToken) {
          return;
        }

        const result = await reissue({ refreshToken });
        setAccessToken(result.accessToken);
        setRefreshToken(result.refreshToken);
        setAccessTokenExpiredTime(result.accessTokenExpiredTime);
      } catch (reissueError) {
        const isTokenExpired =
          reissueError instanceof AxiosError &&
          reissueError.response?.status === 401;
        if (isTokenExpired) {
          clearTokens();
        }
        setError(reissueError as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [
    reissue,
    setAccessToken,
    setRefreshToken,
    setAccessTokenExpiredTime,
    clearTokens,
  ]);

  return { isLoading, error };
};

export default useSetTokenToStoreState;
