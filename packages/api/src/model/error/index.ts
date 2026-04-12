import { type ErrorCode } from "../../constants/ERROR";

export interface ServerErrorBody {
  status: "error";
  errorCode: string;
  message: string;
}

export class ApiError extends Error {
  readonly errorCode: ErrorCode | (string & {});
  readonly httpStatus?: number;
  readonly url?: string;

  constructor(params: {
    message: string;
    errorCode: string;
    httpStatus?: number;
    url?: string;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.errorCode = params.errorCode;
    this.httpStatus = params.httpStatus;
    this.url = params.url;
  }

  is(code: ErrorCode): boolean {
    return this.errorCode === code;
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }
}
