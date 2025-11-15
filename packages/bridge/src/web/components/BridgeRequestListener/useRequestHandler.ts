import BRIDGE from "@/web/constants";
import getBridge from "@/web/core";
import Message from "@/web/core/Message";
import { WebviewBridgeMessage } from "@/web/types";
import { useEffect } from "react";

interface UseRequestHandlerProps<RequestMessage, ResponseMessage> {
  requestValidator?: (reqMessage?: RequestMessage) => boolean;
  isAlreadyHandshaked: boolean;
  onRequest: (reqMessage: RequestMessage) => ResponseMessage;
  strictMode: boolean;
}

const useHandleRequest = <RequestType, ResponseType>({
  requestValidator,
  isAlreadyHandshaked,
  onRequest,
  strictMode,
}: UseRequestHandlerProps<RequestType, ResponseType>) => {
  const Bridge = getBridge();
  if (!isAlreadyHandshaked) return;

  // 웹뷰의 응답을 처리하는 로직. 앱으로부터 요청을 받았을 때 실행된다.
  useEffect(() => {
    if (!isAlreadyHandshaked) return;

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
            "클라이언트에서 보낸 요청에 ack가 포함되어 있습니다.",
          );

        if (syn === 1)
          throw new Error(
            "핸드쉐이크가 끝난 시점에서 웹뷰 핸드쉐이크 메시지가 도착하였습니다.",
          );

        if (requestValidator && !requestValidator(body)) {
          throw new Error(
            "요청 메시지의 유효성 검사에 실패하였습니다. 요청 메시지를 확인해주세요.",
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
        // console.error("메시지 처리 중 오류 발생:", error);
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
  }, [Bridge, isAlreadyHandshaked, onRequest, requestValidator, strictMode]);
};

export default useHandleRequest;
