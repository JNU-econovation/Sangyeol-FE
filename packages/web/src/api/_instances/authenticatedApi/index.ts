import { isInStackFrame } from "@/service/StackLink";
import { ErrorResponse } from "@/types/api";
import axios, { AxiosError, AxiosResponse } from "axios";

const authenticatedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, ""),
  timeout: 5000,
  headers:
    process.env.NODE_ENV === "development"
      ? {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
          Accept: "*/*",
        }
      : {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
});

authenticatedApi.interceptors.request.use(
  async (config) => {
    // stackLink에서 미리 보여주는 페이지에서는 fallback만 보여주도록 하기 위한 코드
    if (isInStackFrame()) {
      await new Promise((resolve) => setTimeout(resolve, 99999));
    }

    const token = localStorage.getItem("accessToken");

    // if (!token) {
    //   throw new Error("No access token found in local storage");
    // }

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authenticatedApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },

  async (error: AxiosError<ErrorResponse>) => {
    const err = Object.assign(
      new Error(
        error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
      ),
      {
        name: "ApiError",
        status: "error" as const,
        errorCode: error.response?.data?.errorCode ?? "UNKNOWN_ERROR",
        httpStatus: error.response?.status,
        url: error.config?.url,
        cause: error,
      }
    ) as Error &
      ErrorResponse & { httpStatus?: number; url?: string; cause?: unknown };

    return Promise.reject(err);
  }
);

export default authenticatedApi;
