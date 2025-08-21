"use client";

import { useCallback, useEffect, useState } from "react";
import BRIDGE from "../../constants";
import getBridge from "../../core";

interface RequestProps<ReqBody = unknown, ResBody = unknown> {
  requestMessage: ReqBody;
  responseCallback?: (resMessage: ResBody) => void;
  onErrorCallback?: (error: Error) => void;
}

const useBridge = <ReqBody = unknown, ResBody = unknown>() => {
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

  useEffect(() => {
    sendHandshakeSynMessage();
  }, [sendHandshakeSynMessage]);

  const request = ({
    requestMessage,
    responseCallback,
    onErrorCallback,
  }: RequestProps<ReqBody, ResBody>) => {
    try {
      if (typeof window === "undefined") return;

      Bridge.createMessage({
        ack: BRIDGE.BLANK,
        body: requestMessage,
      }).send<ResBody>(({ body }) => {
        try {
          if (responseCallback && body) return responseCallback(body);
          //TODO: 현재 에러가 콜백 실행에 대한 에러이므로, 실제로 브리지 과정에서 발생한 에러에 대한 처리 로직으로 수정 필요
        } catch (error) {
          if (onErrorCallback) onErrorCallback(error as Error);
        }
      });
    } catch (error) {
      console.error("Error in useBridge request", error);
    }
  };

  return { request };
};

export default useBridge;
