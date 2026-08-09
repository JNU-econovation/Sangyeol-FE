import Spacing from "@shared/components/primitives/layout/Spacing";
import { PropsWithChildren } from "react";

const SafeArea = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Spacing size={18} />
      {children}
    </div>
  );
};

export default SafeArea;
