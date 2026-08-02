import {
  setValueToSecureStore,
  removeValueFromSecureStore,
} from "@utils/secureStore";
import { create } from "zustand";

interface TokensStore {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiredTime: number | null;
  _prevAccessToken: string | null;
  _prevRefreshToken: string | null;
  _prevAccessTokenExpiredTime: number | null;

  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setAccessTokenExpiredTime: (time: number) => void;
  clearTokens: () => void;
}

/**
 * 주의!! secure store에 접근하는 사이드 이팩트를 포함하고있습니다!!!
 *
 * 해당 store는 토큰을 관리하는 store입니다.
 * secureStorage에 저장된 토큰을 관리하며, 토큰을 설정하거나 초기화하는 기능을 제공합니다.
 */
export const useTokenStore = create<TokensStore>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  accessTokenExpiredTime: null,
  _prevAccessToken: null,
  _prevRefreshToken: null,
  _prevAccessTokenExpiredTime: null,
  setAccessToken: (token: string) => {
    const prevAccessToken = get().accessToken;
    // set({ _prevAccessToken: prevAccessToken });
    set({ accessToken: token });
    setValueToSecureStore("accessToken", token).catch((error) => {
      console.error("Failed to save access token to secure store:", error);
      set({ accessToken: prevAccessToken });
    });
  },
  setRefreshToken: (token: string) => {
    const prevRefreshToken = get().refreshToken;
    // set({ _prevRefreshToken: prevRefreshToken });
    set({ refreshToken: token });
    setValueToSecureStore("refreshToken", token).catch((error) => {
      console.error("Failed to save refresh token to secure store:", error);
      set({ refreshToken: prevRefreshToken });
    });
  },
  setAccessTokenExpiredTime: (time: number) => {
    const prevAccessTokenExpiredTime = get().accessTokenExpiredTime;
    // set({ _prevAccessTokenExpiredTime: prevAccessTokenExpiredTime });
    set({ accessTokenExpiredTime: time });
    setValueToSecureStore("accessTokenExpiredTime", `${time}`).catch(
      (error) => {
        console.error(
          "Failed to save access token expired time to secure store:",
          error,
        );
        set({ accessTokenExpiredTime: prevAccessTokenExpiredTime });
      },
    );
  },
  clearTokens: () => {
    set({
      accessToken: null,
      refreshToken: null,
      accessTokenExpiredTime: null,
      _prevAccessToken: null,
      _prevRefreshToken: null,
      _prevAccessTokenExpiredTime: null,
    });

    Promise.all([
      removeValueFromSecureStore("accessToken"),
      removeValueFromSecureStore("refreshToken"),
      removeValueFromSecureStore("accessTokenExpiredTime"),
    ]).catch(() => {
      // secure store 삭제 실패 시 로그만 출력하고 상태는 유지
      console.warn("Failed to clear tokens from secure store");
    });
  },
}));
