import { create } from "zustand";

interface WebviewRef {
  canGoBack: boolean;
  setCanGoBack?: (canGoBack: boolean) => void;
}

/**
 * 해당 스토어는 마이 페이지 코스 웹뷰에서 뒤로가기 가능 여부를 관리하는 용도입니다.
 */
export const useMypageWebviewStore = create<WebviewRef>((set) => ({
  canGoBack: false,
  setCanGoBack: (canGoBack: boolean) => set({ canGoBack }),
}));
