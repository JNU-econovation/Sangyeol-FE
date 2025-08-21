import { WebviewBridge } from "./WebviewBridge";

let Bridge: WebviewBridge | null = null;

const getBridge = (): WebviewBridge => {
  if (typeof window === "undefined") {
    return new WebviewBridge();
  }

  if (!Bridge) {
    Bridge = new WebviewBridge();
  }

  return Bridge;
};

export default getBridge;
