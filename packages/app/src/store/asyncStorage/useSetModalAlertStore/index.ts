import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SetModalAlertStore {
  isReportAlertVisible: boolean;
  setIsShowReportAlert: (show: boolean) => void;
}

export const REPORT_ALERT_KEY = "reportAlertShow";

const useSetModalAlertStore = create<SetModalAlertStore>()(
  persist(
    (set) => ({
      isReportAlertVisible: true,
      setIsShowReportAlert: (show: boolean) =>
        set(() => ({ isReportAlertVisible: show })),
    }),
    {
      name: REPORT_ALERT_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ isReportAlertVisible }) => ({ isReportAlertVisible }),
    },
  ),
);

export default useSetModalAlertStore;
