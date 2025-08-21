import WebView from "react-native-webview";

import { WebviewBridgeMessage } from "../types";
import RWindow from "./RWindow";

class Message<BodyType = unknown> {
  private _id: string;
  private ack: string | null;
  private flag: { syn: 0 | 1 };
  private body?: BodyType;

  constructor(
    private ref: React.RefObject<WebView<{}> | null>,
    private R_WND: RWindow,
    {
      ack = null,
      syn = 0,
      body,
    }: {
      syn: 0 | 1;
      ack: string | null;
      body?: BodyType;
    },
  ) {
    this._id = this.getRandomId();
    this.ack = ack;
    this.flag = { syn };
    this.body = body;
  }

  private getRandomId = () => Date.now() * Math.random() + "";

  public static sendWebviewMessage = <ResMessage>(
    ref: React.RefObject<WebView<{}> | null>,
    message: WebviewBridgeMessage<ResMessage>,
  ) => {
    ref.current?.postMessage(JSON.stringify(message));
  };

  private createNewMessageObj = () => {
    return {
      _id: this._id,
      ack: this.ack,
      flag: this.flag,
      body: this.body,
    };
  };

  public send = <ResMessageType>(callback?: (m: ResMessageType) => void) => {
    Message.sendWebviewMessage(this.ref, this.createNewMessageObj());

    if (!callback) return;
    this.R_WND.addListener(this._id, callback);
  };
}

export default Message;
