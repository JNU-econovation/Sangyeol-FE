export type Method = "GET" | "POST" | "PUT" | "DELETE";
type Status = "success" | "error";

export interface MessageEventResponseData<Data = unknown> {
  status: Status;
  name: string;
  data?: Data;
}

export interface MessageEventRequestData<Body = unknown> {
  method: Method;
  name: string;
  body?: Body;
}
