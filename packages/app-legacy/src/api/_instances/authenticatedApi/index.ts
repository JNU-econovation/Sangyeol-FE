import { ApiError, type ServerErrorBody } from "api";
import { getValueFromSecureStore } from "@utils/secureStore";
import axios, { AxiosError } from "axios";

const { EXPO_PUBLIC_MODE } = process.env;

const authenticatedApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL?.replace(/\/$/, ""),
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

authenticatedApi.interceptors.request.use(
  async (config) => {
    // 헤더에서 accessToken 추가
    const accessToken = await getValueFromSecureStore("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (EXPO_PUBLIC_MODE === "development") {
      console.log(
        "==================[ ✅ authenticatedApi API Request]======================",
      );
      console.log("[method:]", config.method?.toUpperCase());
      console.log("[url:]", config.url);
      console.log("[data:]", config.data);
      console.log("[params:]", config.params, "\n");
    }
    console.log(
      "=========================================================\n\n",
    );
    return config;
  },
  (error) => {
    if (EXPO_PUBLIC_MODE === "development") {
      console.error(
        "==================[ ❌ authenticatedApi API Request Error]======================",
      );
      console.error("[error:]", error.message);
      if (error.config) {
        console.error("[url:]", error.config.url);
        console.error("[data:]", error.config.data);
        console.error("[params:]", error.config.params, "\n");
      }
    }
    console.error("[error:]", error);
    console.log(
      "=========================================================\n\n",
    );
    return Promise.reject(error);
  },
);

authenticatedApi.interceptors.response.use(
  (response) => {
    if (EXPO_PUBLIC_MODE === "development") {
      console.log(
        "==================[ ✅ authenticatedApi API Response]======================",
      );
      console.log("[status:]", response.status);
      console.log("[url:]", response.config.url);
      console.log("[data:]", response.data, "\n");
      console.log(
        "=========================================================\n\n",
      );
    }

    return response.data;
  },
  (error: AxiosError<ServerErrorBody>) => {
    if (EXPO_PUBLIC_MODE === "development") {
      console.warn(
        "==================[ ❌ authenticatedApi API error]======================",
      );
      console.warn("[error :]", error);
      console.warn("[url:]", error.config?.url);
      console.warn("[data:]", error.response?.data);
      console.warn("[status:]", error.response?.status, "\n");
      console.log(
        "=========================================================\n\n",
      );
    }

    return Promise.reject(
      new ApiError({
        message: error.response?.data?.message ?? "알 수 없는 오류가 발생했습니다.",
        errorCode: error.response?.data?.errorCode ?? "UNKNOWN_ERROR",
        httpStatus: error.response?.status,
        url: error.config?.url,
      }),
    );
  },
);

export default authenticatedApi;
