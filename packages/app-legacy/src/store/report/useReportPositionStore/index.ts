import { create } from "zustand";

interface ReportPositionStore {
  reportPosition: { latitude: number; longitude: number } | null;
  setReportPosition: (position: {
    latitude: number;
    longitude: number;
  }) => void;
}

/**
 * 해당 스토어는 상세 신고에서 위치 정보를 저장하는 용도입니다.
 * 필요한 이유는 위치만을 설정하기 위해서 기존 페이지가 아닌 다른 스택 스크린으로 이동해야 하기 때문입니다.
 * 뒤로 가기를 해도 올바르게 설정이 되어야 하므로 불가피하게 사용하게 되었습니다.
 */
export const useReportPositionStore = create<ReportPositionStore>(
  (set, get) => ({
    reportPosition: null,
    setReportPosition: (position) => set({ reportPosition: position }),
  }),
);
