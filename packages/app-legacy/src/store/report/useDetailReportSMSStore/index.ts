import { create } from "zustand";

interface DetailReportSMSStore {
  smsContent: {
    content: string;
    lat: number;
    lng: number;
    reporterName: string;
    reporterPhone: string;
    attachment: string[];
    enable: boolean;
  };
  setSMSContent: (smsContent: DetailReportSMSStore["smsContent"]) => void;
}

export const useDetailReportSMSStore = create<DetailReportSMSStore>((set) => ({
  smsContent: {
    content: "",
    lat: 0,
    lng: 0,
    reporterName: "",
    reporterPhone: "",
    attachment: [],
    enable: false,
  },
  setSMSContent: (smsContent) =>
    set(() => ({
      smsContent,
    })),
}));
