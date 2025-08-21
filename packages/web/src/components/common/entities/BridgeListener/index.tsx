import BridgeRequestListener from "@/service/bridge/components/BridgeRequestListener";
import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { ComponentProps } from "react";

export default function BridgeListener(
  props: ComponentProps<
    typeof BridgeRequestListener<
      MessageEventRequestData,
      MessageEventResponseData
    >
  >
) {
  return (
    <BridgeRequestListener<MessageEventRequestData, MessageEventResponseData>
      {...props}
    />
  );
}
