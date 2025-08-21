import { PropsWithChildren, HTMLAttributes } from "react";

interface DimmedProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}

export default function Dimmed({ children, ...props }: DimmedProps) {
  return (
    <div
      className="fixed w-screen h-screen inset-0 z-50 bg-black/40"
      {...props}
    >
      {children}
    </div>
  );
}
