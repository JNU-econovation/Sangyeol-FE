import Bridge from "@service/bridge";
import { useRef } from "react";
import WebView from "react-native-webview";

interface PostMessageProps<MessageType, ResponseType> {
  message: MessageType;
  onResponse?: (response: ResponseType) => void;
}

const usePostMessageBridge = <ReqType, ResponseType>() => {
  const ref = useRef<WebView | null>(null);

  const postMessage = ({
    message,
    onResponse,
  }: PostMessageProps<ReqType, ResponseType>) => {
    if (!ref.current) {
      console.warn("[usePostMessageBridge] WebView ref is not available");
      return;
    }

    try {
      const newMessage = Bridge.createMessage<ReqType>(ref, {
        ack: null,
        body: message,
      });
      newMessage.send<ResponseType>((response) => {
        if (onResponse) return onResponse(response);
      });
    } catch (error) {
      console.error("[usePostMessageBridge] Failed to send message:", error);
    }
  };

  return {
    ref,
    postMessage,
  };
};

export default usePostMessageBridge;
