import { Alert } from "react-native";

export interface SocketServiceOptions {
  url: string;
  token: string;
  onMessage?: (data: SocketMessage) => void;
  onError?: (error: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

interface SocketMessage {
  event: string;
  status: string;
  data?: any;
}

export const socketMessageTypeGuard = (
  message: any,
): message is SocketMessage =>
  message &&
  typeof message === "object" &&
  "event" in message &&
  "status" in message &&
  "data" in message &&
  typeof message.event === "string" &&
  typeof message.status === "string" &&
  typeof message.data === "object";

export default class Socket {
  private socket: WebSocket | null = null;
  public isAuthenticated: boolean = false;

  connect({
    url,
    token,
    onMessage,
    onError,
    onOpen,
    onClose,
  }: SocketServiceOptions) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.socket?.send(
        JSON.stringify({
          event: "auth-user",
          data: {
            authorization: token,
          },
        }),
      );
      onOpen?.();
    };

    this.socket?.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);

      // console.log("[SocketService] 메시지 수신:", response);
      if (
        socketMessageTypeGuard(response) &&
        response.status === "success" &&
        !response.data &&
        !this.isAuthenticated
      ) {
        console.log("[SocketService] Socket authentication successful");
        this.isAuthenticated = true;
      }
      if (
        socketMessageTypeGuard(response) &&
        response.status === "success" &&
        response.data &&
        this.isAuthenticated
      ) {
        onMessage?.(response);
      }
    });

    this.socket?.addEventListener("error", (error) => {
      console.error("[SocketService] Socket connection error:", error);
      onError?.(error);
    });
    this.socket?.addEventListener("close", (event) => {
      console.log("[SocketService] Socket connection closed.", event);
      this.isAuthenticated = false;
      onClose?.();
    });
  }

  disconnect() {
    if (!this.socket) {
      console.warn("[SocketService] No socket connection to disconnect.");
      return;
    }
    this.socket?.close();
    this.socket = null;
  }

  //

  sendMessage(message: any) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn("[SocketService] Cannot send: socket not open.");
      return;
    }
    this.socket.send(JSON.stringify(message));
  }

  public addEventListener(
    event: "open" | "message" | "error" | "close",
    listener: (event: any) => void,
  ) {
    if (!this.socket) {
      console.warn(
        "[SocketService] No socket connection to add event listener.",
      );
      return;
    }
    this.socket.addEventListener(event, listener);
  }
}
