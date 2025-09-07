"use client";

import { useCallback, useEffect, useState } from "react";

import BRIDGE from "../../constants";
import getBridge from "../../core";
import type { WebviewBridgeMessage } from "../../types";
import Message from "../../core/Message";

interface BridgeProps<RequestMessage, ResponseMessage> {
  strictMode?: boolean;
  onRequest: (reqMessage: RequestMessage) => ResponseMessage;
  requestValidator?: (reqMessage?: RequestMessage) => boolean;
}

export default function BridgeRequestListener<RequestType, ResponseType>({
  strictMode = false,
  onRequest,
  requestValidator,
}: BridgeProps<RequestType, ResponseType>) {
  const Bridge = getBridge();
  const [isReady, setIsReady] = useState(false);
  const sendHandshakeSynMessage = useCallback(() => {
    if (isReady) return;
    Bridge.createMessage({
      syn: BRIDGE.SET,
      ack: null,
    }).send((message) => {
      const {
        _id,
        ack,
        flag: { syn },
      } = message;
      {
        if (syn !== BRIDGE.SET)
          throw new Error(
            "웹뷰 핸드쉐이크 메시지의 syn 값이 올바르지 않습니다. syn 값은 1이어야 합니다."
          );
        if (ack === null)
          throw new Error(
            "웹뷰 핸드쉐이크 메시지의 ack 값이 null입니다. 올바른 ack 값을 포함해야 합니다."
          );
      }
      setIsReady(true);

      Bridge.createMessage({
        ack: _id,
        syn: BRIDGE.RESET,
      }).send();
    });
  }, [Bridge, isReady]);

  // 웹뷰의 응답을 처리하는 로직. 앱으로부터 요청을 받았을 때 실행된다.
  useEffect(() => {
    if (!isReady) return;

    const handleMessage = (event: Event) => {
      const messageEvent = event as MessageEvent;

      const { data } = messageEvent;
      try {
        const {
          ack,
          _id,
          flag: { syn },
          body,
        } = typeof data === "string"
          ? (JSON.parse(data) as WebviewBridgeMessage<RequestType>)
          : (data as WebviewBridgeMessage<RequestType>);

        if (ack !== null)
          throw new Error(
            "클라이언트에서 보낸 요청에 ack가 포함되어 있습니다."
          );

        if (syn === 1)
          throw new Error(
            "핸드쉐이크가 끝난 시점에서 웹뷰 핸드쉐이크 메시지가 도착하였습니다."
          );

        if (requestValidator && !requestValidator(body)) {
          throw new Error(
            "요청 메시지의 유효성 검사에 실패하였습니다. 요청 메시지를 확인해주세요."
          );
        }

        if (body) {
          const responseMessage = onRequest(body);

          if (strictMode && !responseMessage)
            throw new Error("응답 메시지가 정의되지 않았습니다.");

          Bridge.createMessage({
            ack: _id,
            syn: BRIDGE.RESET,
            body: responseMessage,
          }).send();
        }
      } catch (error) {
        console.error("메시지 처리 중 오류 발생:", error);
      }
    };

    // 요청에 대한 응답을 처리하는 로직
    if (Message.checkIsAndroid()) {
      document.addEventListener("message", handleMessage as EventListener);
      return () =>
        document.removeEventListener("message", handleMessage as EventListener);
    } else {
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }
  }, [Bridge, isReady, onRequest, requestValidator, strictMode]);

  // 웹뷰 핸드쉐이크를 위한 로직
  useEffect(() => {
    sendHandshakeSynMessage();
  }, [sendHandshakeSynMessage]);

  return null;
}
