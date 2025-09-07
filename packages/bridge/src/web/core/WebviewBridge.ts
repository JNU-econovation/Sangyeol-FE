import { Flag, WebviewBridgeMessage } from "../types";
import Message from "./Message";
import RWindow from "./RWindow";

export class WebviewBridge {
  private R_WND: RWindow = new RWindow();

  public createMessage = <BodyType>({
    ack = null,
    syn = 0,
    body,
  }: Omit<WebviewBridgeMessage<BodyType>, "flag" | "_id"> & {
    syn?: Flag;
  }) => {
    return new Message<BodyType>(this.R_WND, {
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
}
