"use client";

import Text from "@shared/ui/Text";
import useRouteBackBridge from "@/hooks/feature/bridge/useRouteBackBridge";
import LeftChevronIcon from "@/components/common/shared/ui/icons/LeftChevronIcon";

interface WeekHeaderProps {
  headerText?: string;
}

export default function WeekHeader({ headerText }: WeekHeaderProps) {
  const goBack = useRouteBackBridge();

  return (
    <header className="border-gray-30 flex flex-col items-center relative pb-3">
      <button
        onClick={goBack}
        className="absolute left-0"
        aria-label="뒤로가기"
      >
        <LeftChevronIcon />
      </button>
      <Text fontSize="text-base">{headerText}</Text>
    </header>
  );
}
