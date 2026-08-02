export interface NoticeBarState {
  id: number;
  message: string;
  duration: number;
}

export interface NoticeBarContextType {
  showNotice: ({
    message,
    duration,
  }: {
    message: string;
    duration?: number;
  }) => void;
}
