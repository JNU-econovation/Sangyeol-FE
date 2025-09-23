import useUserProfileStatusQuery from "@hooks/feature/query/query/useUserProfileStatusQuery";
import { getValueFromSecureStore } from "@utils/secureStore";
import { useCallback, useEffect, useState } from "react";

const useCheckUserLoginAndProfileState = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [isCheckingLoginLoading, setIsCheckingLoginLoading] = useState(true);
  const {
    data: profileStatus,
    isLoading: profileStatusLoading,
    error: profileStatusError,
  } = useUserProfileStatusQuery();

  const checkLogin = useCallback(async () => {
    try {
      const existentAccessToken = await getValueFromSecureStore("accessToken");
      const existentRefreshToken =
        await getValueFromSecureStore("refreshToken");

      if (existentAccessToken && existentRefreshToken) {
        setAccessToken(existentAccessToken);
        setRefreshToken(existentRefreshToken);
      }
    } catch (error) {
      console.error("[global index] Error checking login status:", error);
    } finally {
      setIsCheckingLoginLoading(false);
    }
  }, []);

  // 처음 렌더링 될 때, 로그인 상태 확인
  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return {
    isLoggedIn: !profileStatusLoading && !!accessToken,
    isProfileComplete: profileStatus?.isComplete ?? false,
    isLoading: profileStatusLoading || isCheckingLoginLoading,
    profileStatusLoading,
    isCheckingLoginLoading,
    error: profileStatusError,

    accessToken,
    refreshToken,
  };
};

export default useCheckUserLoginAndProfileState;
