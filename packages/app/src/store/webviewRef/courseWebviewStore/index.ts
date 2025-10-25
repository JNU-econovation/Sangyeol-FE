import { create } from "zustand";

interface WebviewRef {
  canGoBack: boolean;
  setCanGoBack?: (canGoBack: boolean) => void;
}

/**
 * 해당 스토어는 코스 웹뷰에서 뒤로가기 가능 여부를 관리하는 용도입니다.
 */
export const useCourseWebviewStore = create<WebviewRef>((set, get) => ({
  canGoBack: false,
  setCanGoBack: (canGoBack: boolean) => set({ canGoBack }),
}));
