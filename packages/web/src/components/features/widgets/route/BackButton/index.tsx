"use client";

import { useStackLinkBack } from "stack-link";
import useRouteBackBridge from "@hooks/feature/bridge/useRouteBackBridge";
import LeftChevronIcon from "@icons/LeftChevronIcon";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  animation?: "none" | "fade" | "slide";
}

export default function BackButton({ animation }: BackButtonProps) {
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
        goBack({
          animation: animation || "slide",
        });
      }}
    >
      <LeftChevronIcon alt="뒤로 가기" />
    </button>
  );
}
