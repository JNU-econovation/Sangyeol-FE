import BRIDGE from "@/web/constants";
import getBridge from "@/web/core";
import { useCallback, useEffect } from "react";

interface UseHandshakeProps {
  isAlreadyHandshaked: boolean;
  onHandshakeSuccess?: () => void;
}

const useSendHandshakeSynMessage = ({
  isAlreadyHandshaked,
  onHandshakeSuccess,
}: UseHandshakeProps) => {
  const Bridge = getBridge();
  const sendHandshakeSynMessage = useCallback(() => {
    if (isAlreadyHandshaked) return;
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
            "웹뷰 핸드쉐이크 메시지의 syn 값이 올바르지 않습니다. syn 값은 1이어야 합니다.",
          );
        if (ack === null)
          throw new Error(
            "웹뷰 핸드쉐이크 메시지의 ack 값이 null입니다. 올바른 ack 값을 포함해야 합니다.",
          );
      }

      Bridge.createMessage({
        ack: _id,
        syn: BRIDGE.RESET,
      }).send();

      onHandshakeSuccess && onHandshakeSuccess();
    });
  }, [Bridge, isAlreadyHandshaked]);

  useEffect(() => {
    sendHandshakeSynMessage();
  }, [sendHandshakeSynMessage]);
};

export default useSendHandshakeSynMessage;
