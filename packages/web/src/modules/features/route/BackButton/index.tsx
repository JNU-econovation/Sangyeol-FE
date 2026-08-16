"use client";

import useRouteBackBridge from "@shared/hooks/domain/bridge/useRouteBackBridge";
import LeftChevronIcon from "@icons/LeftChevronIcon";
import { useStackLinkBack } from "stack-link";

interface BackButtonProps {
  animation?: "none" | "fade" | "slide";
}
/**
 * 보더가 있는 뒤로가기 버튼입니다.
 * 이전 레커시 코드입니다. 사용하지마세요
 */
export default function BackButton({ animation }: BackButtonProps) {
  const { goBack, canGoBack } = useStackLinkBack();
  const goBackBridge = useRouteBackBridge();

  const handleClick = () => {
    if (!canGoBack) return goBackBridge();
    goBack({
      animation: animation || "slide",
    });
  };

  return (
    <button onClick={handleClick}>
      <LeftChevronIcon alt="뒤로 가기" />
    </button>
  );
}
