import Bridge from "@service/bridge";
import { WebviewBridgeMessage, WebviewHandshake } from "@service/bridge/types";
import {
  ComponentProps,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Platform } from "react-native";
import WebView from "react-native-webview";
import type { WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";

interface WebViewWithBridgeProps<ReqMessage, ResMessage>
  extends Omit<ComponentProps<typeof WebView>, "onMessage"> {
  onBridgeMessage?:
    | ((reqMessage: ReqMessage) => ResMessage | void)
    | ((reqMessage: ReqMessage) => Promise<ResMessage | void>);
  onReadyToMessage?: () => void;
  middleware?: (message: ReqMessage) => void;
  ref?: Ref<WebView>;
  strictMode?: boolean;
}

const WebviewWithBridge = <ReqMessage, ResMessage>({
  onBridgeMessage,
  onReadyToMessage,
  middleware,
  ref,
  strictMode = true,
  ...props
}: WebViewWithBridgeProps<ReqMessage, ResMessage>) => {
  const [isReady, setIsReady] = useState(false);
  const internalRef = useRef<WebView>(null);
  const webViewRef = ref ? (ref as React.RefObject<WebView>) : internalRef;

  useEffect(() => {
    if (isReady) onReadyToMessage?.();
    // Bridge.clear();
  }, [isReady, onReadyToMessage]);

  const handleMissingResponse = useCallback(
    (body: any, strictMode: boolean) => {
      const errorMessage =
        "전달받은 브리지에 대한 응답이 없습니다. onBridgeMessage를 확인해주세요.\n" +
        `전달 받은 브리지 : ${JSON.stringify(body)}`;

      if (strictMode) {
        throw new Error(errorMessage);
      } else {
        console.warn(errorMessage);
      }
    },
    [strictMode],
  );

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const reqMessage = JSON.parse(
        event.nativeEvent.data,
      ) as WebviewBridgeMessage<ReqMessage>;

      const {
        _id,
        ack,
        flag: { syn },
        body,
      } = reqMessage;

      ack && Bridge.renderCallback(ack, reqMessage);

      // handshake
      // 웹으로부터 handshake sync 메시지 수신
      if (!isReady) {
        if (!isReady && syn === 1 && ack === null) {
          // 웹에서 syn을 보냈을 때, syn/ack을 보내준다.
          Bridge.createMessage(webViewRef, {
            syn: 1,
            ack: _id,
          }).send<WebviewHandshake>(({ ack, flag: { syn } }) => {
            if (!isReady && syn === 0 && ack !== null) {
              console.log(
                `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]handshake end`,
              );
              setIsReady(true);
              return;
            }
          });
          return;
        }
      }

      if (!isReady) return;

      // body가 있는 일반 요청 메시지 처리
      if (!body) return;

      middleware?.(body);

      // normal message
      if (onBridgeMessage) {
        const resMessage = onBridgeMessage(body);

        // onBridgeMessage가 Promise를 반환하는 경우
        if (resMessage instanceof Promise) {
          resMessage
            .then((response) => {
              if (!response) {
                if (strictMode)
                  throw new Error(
                    "전달받은 브리지에 대한 응답이 없습니다. onBridgeMessage를 확인해주세요.\n" +
                      `전달 받은 브리지 : ${JSON.stringify(body)}`,
                  );
                else
                  console.warn(
                    "전달받은 브리지에 대한 응답이 없습니다. onBridgeMessage를 확인해주세요.\n" +
                      `전달 받은 브리지 : ${JSON.stringify(body)}`,
                  );
              }
              Bridge.createMessage(webViewRef, {
                ack: _id,
                body: response,
              }).send();
            })
            .catch((error) => {
              console.error("Error in onBridgeMessage:", error);
            });
          return;
        } else {
          // onBridgeMessage가 일반 값을 반환하는 경우
          if (!resMessage) {
            if (strictMode)
              throw new Error(
                "전달받은 브리지에 대한 응답이 없습니다. onBridgeMessage를 확인해주세요.\n" +
                  `전달 받은 브리지 : ${JSON.stringify(body)}`,
              );
            else
              console.warn(
                "전달받은 브리지에 대한 응답이 없습니다. onBridgeMessage를 확인해주세요.\n" +
                  `전달 받은 브리지 : ${JSON.stringify(body)}`,
              );
          }
          Bridge.createMessage(webViewRef, {
            ack: _id,
            body: resMessage,
          }).send();
        }

        if (!resMessage) {
          handleMissingResponse(body, strictMode);
          Bridge.createMessage(webViewRef, {
            ack: _id,
            body: resMessage,
          }).send();
        }
      }
    },
    [onBridgeMessage, middleware, isReady],
  );

  return (
    <WebView
      ref={webViewRef}
      onMessage={handleMessage}
      // iOS 제스처 방지
      bounces={false}
      scrollEnabled={true}
      decelerationRate={Platform.OS === "ios" ? "normal" : 0.998}
      contentInsetAdjustmentBehavior="never"
      {...props}
    />
  );
};

export default WebviewWithBridge;
