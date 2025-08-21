import { logMessageWithTime } from "./index";

describe("logMessageWithTime", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    jest.useFakeTimers();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.useRealTimers();
  });

  it("현재 시간을 HH:MM:SS 형식으로 메시지와 함께 로그에 출력한다.", () => {
    const mockDate = new Date("2023-01-01T12:34:56");
    jest.setSystemTime(mockDate);

    logMessageWithTime("Test message");

    expect(consoleSpy).toHaveBeenCalledWith("[12:34:56] Test message");
  });

  it("한 자리 숫자 시간 값으로 메시지를 로그에 출력한다.", () => {
    const mockDate = new Date("2023-01-01T09:05:03");
    jest.setSystemTime(mockDate);

    logMessageWithTime("Another test");

    expect(consoleSpy).toHaveBeenCalledWith("[9:5:3] Another test");
  });

  it("빈 메시지를 입력받은 경우 시간값만 보여준다.", () => {
    const mockDate = new Date("2023-01-01T23:59:59");
    jest.setSystemTime(mockDate);

    logMessageWithTime("");

    expect(consoleSpy).toHaveBeenCalledWith("[23:59:59] ");
  });

  it("메시지 내 특수 문자를 포함하여도 변경 없이 출력한다.", () => {
    const mockDate = new Date("2023-01-01T00:00:00");
    jest.setSystemTime(mockDate);

    logMessageWithTime("Test with @#$%^&*() special characters");

    expect(consoleSpy).toHaveBeenCalledWith(
      "[0:0:0] Test with @#$%^&*() special characters",
    );
  });
});
