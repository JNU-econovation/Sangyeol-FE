import SocketBuffer from "./buffer";
import Socket, { SocketServiceOptions } from "./socket";
import globalEventEmitter from "../events";

export default class SocketManager {
  private static instance: SocketManager;
  private buffer = new SocketBuffer();

  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public makeNewConnection({
    url,
    onOpen,
    onMessage,
    onClose,
    ...restOptions
  }: SocketServiceOptions) {
    const existingSocket = this.getSocket(url);
    if (existingSocket) {
      console.log(
        `[SocketManager] Socket for ${url} already exists. Using existing connection.`,
      );
      return;
    }

    const newSocketInstance = new Socket();
    const handleOpen = () => {
      onOpen?.();
      this.buffer.addSocket(url, newSocketInstance);
    };

    const handleMessage = (response: any) => {
      // 전역 이벤트로 메시지 브로드캐스트
      globalEventEmitter.emit(`socket-message-${url}`, response);
      // 기존 onMessage도 호출 (호환성 유지)
      onMessage?.(response);
    };

    const handleClose = () => {
      globalEventEmitter.emit(`socket-close-${url}`);
      onClose?.();
      this.buffer.removeSocket(url);
    };

    newSocketInstance.connect({
      url,
      onOpen: handleOpen,
      onMessage: handleMessage,
      onClose: handleClose,
      ...restOptions,
    });
  }

  public disconnectSocket(url: string) {
    const socket = this.buffer.getSocket(url);
    if (socket) {
      socket.disconnect();
      this.buffer.removeSocket(url);
    }
  }

  public getSocket(url: string): Socket | null {
    return this.buffer.getSocket(url);
  }
}
