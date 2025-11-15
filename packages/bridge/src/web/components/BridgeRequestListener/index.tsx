"use client";

import { useState } from "react";

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

  useSendHandshakeSynMessage({
    isAlreadyHandshaked: isReady,
    onHandshakeSuccess: () => setIsReady(true),
  });

  useHandleRequest<RequestType, ResponseType>({
    isAlreadyHandshaked: isReady,
    strictMode,
    onRequest,
    requestValidator,
  });

  return null;
}
