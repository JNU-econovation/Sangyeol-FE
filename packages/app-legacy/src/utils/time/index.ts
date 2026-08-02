// TODO: @util로 옮기기

export const msToTimeText = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const timestampToMinutesSeconds = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

/**
 * 타임스탬프를 "YYYY.MM.DD HH:mm" 형식으로 변환
 * @param timestamp - 타임스탬프 (밀리초)
 * @returns 포맷된 날짜 문자열
 */
export const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

/**
 * 타임스탬프를 "HH:mm" 형식으로 변환
 * @param timestamp - 타임스탬프 (밀리초)
 * @returns 포맷된 시간 문자열
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

/**
 * 타임스탬프에서 요일을 한국어로 반환
 * @param timestamp - 타임스탬프 (밀리초)
 * @returns 한국어 요일명 (예: "일요일")
 */
export const getKoreanDayOfWeek = (timestamp: number): string => {
  const date = new Date(timestamp);
  const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  return days[date.getDay()];
};
