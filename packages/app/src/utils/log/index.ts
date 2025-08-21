/**
 * [[./index.test.ts]]
 * @fileoverview 현재 시간을 HH:MM:SS 형식으로 메시지와 함께 로그에 출력하는 함수입니다.
 */
export const logMessageWithTime = (message: string) => {
  const now = new Date();
  const timeString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  console.log(`[${timeString}] ${message}`);
};
