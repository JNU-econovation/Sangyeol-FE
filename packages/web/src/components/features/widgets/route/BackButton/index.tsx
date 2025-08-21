"use client";

import useStackLinkBack from "@/service/StackLink/hooks/useStackLinkBack";
import useRouteBackBridge from "@hooks/feature/bridge/useRouteBackBridge";
import LeftChevronIcon from "@icons/LeftChevronIcon";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const { goBack, canGoBack } = useStackLinkBack();
  const goBackBridge = useRouteBackBridge();
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (!canGoBack) {
          if (history.length > 1) {
            router.back();
            return;
          }
          goBackBridge();
          return;
        }
        goBack();
      }}
    >
      <LeftChevronIcon alt="뒤로 가기" />
    </button>
  );
}
