import Spacing from "@shared/components/primitives/layout/Spacing";
import { PropsWithChildren } from "react";

const DEFAULT_TOP_SPACING = 20;

interface SafeAreaProps extends PropsWithChildren {
  topSpacing?: number;
  className?: string;
}

const SafeArea = ({
  children,
  topSpacing = DEFAULT_TOP_SPACING,
  className,
}: SafeAreaProps) => {
  return (
    <div className={className}>
      <Spacing size={topSpacing} />
      {children}
    </div>
  );
};

export default SafeArea;
