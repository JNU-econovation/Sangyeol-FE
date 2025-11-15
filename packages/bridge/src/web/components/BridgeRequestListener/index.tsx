"use client";

import { useEffect, useState } from "react";

import getBridge from "../../core";
import useSendHandshakeSynMessage from "./useHandshake";
import useHandleRequest from "./useRequestHandler";

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
  const [isReady, setIsReady] = useState(false);
  const sendHandshakeSynMessage = useSendHandshakeSynMessage({
    isAlreadyHandshaked: isReady,
    onHandshakeSuccess: () => setIsReady(true),
  });

  useHandleRequest<RequestType, ResponseType>({
    isAlreadyHandshaked: isReady,
    strictMode,
    onRequest,
    requestValidator,
  });

  // 웹뷰 핸드쉐이크를 위한 로직
  useEffect(() => {
    sendHandshakeSynMessage();
  }, [sendHandshakeSynMessage]);

  return null;
}
