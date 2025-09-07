import { BridgeRequestListener } from "bridge/web";
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
  >,
) {
  return (
    <BridgeRequestListener<MessageEventRequestData, MessageEventResponseData>
      {...props}
    />
  );
}
