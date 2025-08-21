"use client";

import XIcon from "@icons/XIcon";
import Text from "@shared/ui/Text";
import { useCallback } from "react";

interface TagItemWithCancelProps {
  text: string;
  onClickCancel?: () => void;
  onClickTag?: () => void;
}

export default function TagItemWithCancel({
  text,
  onClickCancel,
  onClickTag,
}: TagItemWithCancelProps) {
  const onClickCancelButton = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!onClickCancel) return;
      onClickCancel();
    },
    [onClickCancel]
  );

  const handleClickTag = useCallback(
    (e: React.MouseEvent) => {
      if (!onClickTag) return;

      if (e.target === e.currentTarget) {
        e.stopPropagation();
        return;
      }

      onClickTag();
    },
    [onClickTag]
  );

  return (
    <div
      className="border border-gray-200 rounded-full pl-4 pr-3 py-1 text-xs"
      typeof="button"
      onClick={handleClickTag}
    >
      <Text fontSize="text-xs">{text}</Text>
      <button onClick={onClickCancelButton} className="ml-1">
        <XIcon alt="태그 제거" />
      </button>
    </div>
  );
}
