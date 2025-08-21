import { WebviewBridgeMessage } from "../types";
import RWindow from "./RWindow";

class Message<Body> implements WebviewBridgeMessage<Body> {
  public _id: string;
  public ack: string | null;
  public flag: { syn: 0 | 1 };
  public body?: Body;

  private R_WND: RWindow;

  public static checkIsAndroid = () => {
    if (!window || !navigator) return false;
    return /Android/i.test(navigator.userAgent);
  };

  constructor(
    rwnd: RWindow,
    {
      ack = null,
      syn = 0,
      body,
    }: {
      syn: 0 | 1;
      ack: string | null;
      body?: Body;
    }
  ) {
    this._id = this.getRandomId();
    this.ack = ack;
    this.flag = { syn };
    this.body = body;

    this.R_WND = rwnd;
  }

  private getRandomId = () => Date.now() * Math.random() + "";

  public static sendWebviewMessage = (message: unknown) => {
    const stringifiedMessage = JSON.stringify(message);
    window.ReactNativeWebView?.postMessage(stringifiedMessage);
  };

  private createNewMessageObj = () => {
    return {
      _id: this._id,
      ack: this.ack,
      flag: this.flag,
      body: this.body,
    };
  };

  public send = <Body>(callback?: (m: WebviewBridgeMessage<Body>) => void) => {
    Message.sendWebviewMessage(this.createNewMessageObj());

    if (!callback) return;
    this.R_WND.addListener(this._id, callback);

    const messageHandler = (event: Event) => {
      const messageEvent = event as MessageEvent<WebviewBridgeMessage<Body>>;
      messageEvent.stopPropagation();

      const resMessage =
        typeof messageEvent.data === "string"
          ? (JSON.parse(messageEvent.data) as WebviewBridgeMessage<Body>)
          : messageEvent.data;

      if (resMessage.ack === this._id) {
        const listeners = this.R_WND.popCallbacksById(this._id);
        listeners.forEach((listener) => listener(resMessage));

        document.removeEventListener("message", messageHandler);
        window.removeEventListener("message", messageHandler);
      }
    };

    document.addEventListener("message", messageHandler as EventListener);
    window.addEventListener("message", messageHandler);
  };
}

export default Message;
