import WebView from "react-native-webview";

import type { Flag, WebviewBridgeMessage } from "../types";
import Message from "./Message";
import RWindow from "./RWindow";

export class WebViewBridge {
  private R_WND: RWindow = new RWindow();

  public createMessage = <BodyType>(
    ref: React.RefObject<WebView<{}> | null>,
    {
      ack = null,
      syn = 0,
      body,
    }: Omit<WebviewBridgeMessage<BodyType>, "flag" | "_id"> & {
      syn?: Flag;
    },
  ) => {
    return new Message<BodyType>(ref, this.R_WND, {
      ack,
      syn,
      body,
    });
  };

  constructor() {}

  public renderCallback = (ack: string, body: unknown) => {
    const callbacks = this.R_WND.popCallbacksById(ack);

    callbacks.forEach((callback) => callback(body));
  };

  public clear = () => {
    this.R_WND.clear();
    return this.R_WND;
  };
}
