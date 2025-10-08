import { PropsWithChildren, HTMLAttributes, useEffect } from "react";

interface DimmedProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}

export default function Dimmed({ children, ...props }: DimmedProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed w-screen h-screen inset-0 z-50 bg-black/40 select-none"
      {...props}
    >
      {children}
    </div>
  );
}
