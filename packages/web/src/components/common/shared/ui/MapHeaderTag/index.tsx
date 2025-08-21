"use client";

import { cn } from "@/utils/cn";

interface MapHeaderTagProps {
  text: string;
  isSelected: boolean;
  onClickHandler?: () => void;
}

export default function MapHeaderTag({
  text,
  isSelected,
  onClickHandler,
}: MapHeaderTagProps) {
  return (
    <button
      className={cn(
        " border rounded-full text-sm px-3 shrink-0 py-1 border-gray-30",
        {
          "bg-main-green text-white": isSelected,
          "bg-white": !isSelected,
        }
      )}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
}
