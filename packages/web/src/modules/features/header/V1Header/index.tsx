"use client";

import ChevronLeftIcon from "@/shared/components/primitives/ui/icons/ChevronLeftIcon";
import useRouteBackBridge from "@shared/hooks/domain/bridge/useRouteBackBridge";
import { useStackLinkBack } from "stack-link";

interface V1HeaderProps {
  title: string;
  animation?: "none" | "fade" | "slide";
}

const V1Header = ({ title, animation }: V1HeaderProps) => {
  const { goBack, canGoBack } = useStackLinkBack();
  const goBackBridge = useRouteBackBridge();

  const handleClick = () => {
    if (!canGoBack) return goBackBridge();
    goBack({
      animation: animation || "slide",
    });
  };

  return (
    <header className="flex h-11 w-full items-center gap-2 sticky top-0 z-10 bg-gray-300">
      <button onClick={handleClick}>
        <ChevronLeftIcon />
      </button>

      <h1 className="w-full text-center text-xl font-semibold tracking-[-0.4px] text-black-900">
        {title}
      </h1>

      <div className="size-6 shrink-0" />
    </header>
  );
};

export default V1Header;
