export type Flag = 0 | 1;

export interface WebviewHandshake {
  _id: string;
  ack: string | null;
  flag: {
    syn: Flag;
  };
}

export interface WebviewBridgeMessage<Body = unknown> extends WebviewHandshake {
  body?: Body;
}
