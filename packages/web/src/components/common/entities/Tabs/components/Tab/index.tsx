import type { BorderColorType } from "@/types/css";
import { cn } from "@/utils/cn";
import { memo, useEffect } from "react";

import useTabContext from "../../hooks/useTabContext";

interface TabProps {
  label: string;
  defaultSelected?: boolean;
  selectedColor?: BorderColorType;
  defaultColor?: BorderColorType;
  grow?: boolean;
}
export default memo(function Tab({
  label,
  defaultSelected = false,
  defaultColor,
  selectedColor,
  grow = false,
}: TabProps) {
  const { selectedTab, setSelectedTabHandler } = useTabContext();

  useEffect(() => {
    if (defaultSelected && selectedTab === null) {
      setSelectedTabHandler(label);
    }
  }, [defaultSelected, label, selectedTab, setSelectedTabHandler]);

  return (
    <button
      className={cn(
        "px-4 py-2 transition-all border-b-2 border-transparent shrink-0",
        {
          [selectedColor || "border-main-green"]: selectedTab === label,
          [defaultColor || ""]: selectedTab !== label,
          grow: grow,
        }
      )}
      onClick={() => setSelectedTabHandler(label)}
    >
      {label}
    </button>
  );
});
