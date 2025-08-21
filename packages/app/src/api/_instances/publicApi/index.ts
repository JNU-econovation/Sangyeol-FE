import { ErrorResponse } from "@model/api";
import axios from "axios";

const { EXPO_PUBLIC_MODE } = process.env;

const publicApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL?.replace(/\/$/, ""),
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

publicApi.interceptors.request.use(
  (config) => {
    if (EXPO_PUBLIC_MODE === "development") {
      console.log(
        "==================[Public API Request]======================",
      );
      console.log("[method:]", config.method?.toUpperCase());
      console.log("[url:]", config.url);
      console.log("[data:]", config.data);
      console.log("[params:]", config.params);
    }
    return config;
  },
  (error) => {
    if (EXPO_PUBLIC_MODE === "development") {
      console.error(
        "==================[Public API Request Error]======================",
      );
      console.error("[error:]", error.message);
      if (error.config) {
        console.error("[url:]", error.config.url);
        console.error("[data:]", error.config.data);
        console.error("[params:]", error.config.params);
      }
    }
    console.error("[error:]", error);
    return Promise.reject(error);
  },
);

publicApi.interceptors.response.use(
  async (response) => {
    if (EXPO_PUBLIC_MODE === "development") {
      console.log(
        "==================[Public API Response]======================",
      );
      console.log("[status:]", response.status);
      console.log("[url:]", response.config.url);
      console.log("[data:]", response.data);
    }
    return response.data;
  },
  (error) => {
    if (EXPO_PUBLIC_MODE === "development") {
      console.error(
        "==================[Public API error]======================",
      );
      console.error("[error :]", error);
      console.error("[url:]", error.config?.url);
      console.error("[data:]", error.response?.data);
      console.error("[status:]", error.response?.status);
    }
    
    const err = Object.assign(
      new Error(error.response?.data?.message || "알 수 없는 오류가 발생했습니다."),
      {
        name: "ApiError",
        status: "error" as const,
        errorCode: error.response?.data?.errorCode ?? "UNKNOWN_ERROR",
        httpStatus: error.response?.status,
        url: error.config?.url,
        cause: error,
      },
    ) as Error & ErrorResponse & { httpStatus?: number; url?: string; cause?: unknown };

    return Promise.reject(err);
  },
);

export default publicApi;
