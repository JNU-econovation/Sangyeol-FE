declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(message: string): void;
    };
  }
  interface Document {
    ReactNativeWebView?: {
      postMessage(message: string): void;
    };
  }
}

export interface MessageEventResponseData<Data = unknown> {
  status: "success" | "error";
  name: string;
  data?: Data;
}

export interface MessageEventRequestData<Body = unknown> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  name: string;
  body?: Body;
}
