import ERROR_CODES from "@constants/api/error";

// API 에러 응답 타입
export interface ErrorResponse extends Error {
  status: "error";
  errorCode: keyof typeof ERROR_CODES;
  message: string;
}
