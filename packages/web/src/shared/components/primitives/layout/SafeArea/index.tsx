import { cn } from "@/shared/utils/cn";
import { PropsWithChildren } from "react";

const DEFAULT_TOP_SPACING = 14;
const BOTTOM_SPACING = 0;

interface SafeAreaProps extends PropsWithChildren {
  topSpacing?: number;
  bottomSpacing?: number;
  contentClassName?: string;
  safetyAreaClassName?: string;
}

const SafeArea = ({
  children,
  topSpacing = DEFAULT_TOP_SPACING,
  bottomSpacing = BOTTOM_SPACING,
  safetyAreaClassName,
  contentClassName,
}: SafeAreaProps) => {
  return (
    <div
      className={cn(
        "h-dvh flex flex-col overflow-hidden",
        safetyAreaClassName,
      )}
      style={{
        paddingTop: `${topSpacing * 0.25}rem`,
        paddingBottom: `${bottomSpacing * 0.25}rem`,
      }}
    >
      <div
        className={cn(
          "w-full flex-1 min-h-0 overflow-auto relative",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SafeArea;
