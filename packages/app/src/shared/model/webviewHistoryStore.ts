import { create } from "zustand";

interface WebviewHistoryStore {
  canGoBack: boolean;
  setCanGoBack: (canGoBack: boolean) => void;
}

/**
 * 해당 스토어는 웹뷰 내부 히스토리의 뒤로가기 가능 여부를 관리하는 용도입니다.
 *
 * 웹뷰에 뒤로 갈 페이지가 남아 있는 동안에는 앱의 스와이프 뒤로가기 제스처를 비활성화하여,
 * 뒤로가기를 웹뷰가 먼저 소비하고 소진된 뒤에 앱 네비게이션으로 위임되도록 합니다.
 */
export const useWebviewHistoryStore = create<WebviewHistoryStore>((set) => ({
  canGoBack: false,
  setCanGoBack: (canGoBack: boolean) => set({ canGoBack }),
}));
