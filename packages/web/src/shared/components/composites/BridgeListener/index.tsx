import { BridgeRequestListener } from "@geongyu/react-native-bridge/web";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@shared/types/bridge";
import { ComponentProps } from "react";

export default function BridgeListener(
  props: ComponentProps<
    typeof BridgeRequestListener<
      MessageEventRequestData,
      MessageEventResponseData
    >
  >,
) {
  return (
    <BridgeRequestListener<MessageEventRequestData, MessageEventResponseData>
      {...props}
    />
  );
}
