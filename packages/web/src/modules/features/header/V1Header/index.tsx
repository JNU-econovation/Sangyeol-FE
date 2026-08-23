"use client";

import ChevronLeftIcon from "@/shared/components/primitives/ui/icons/ChevronLeftIcon";
import useGoBack from "@shared/hooks/domain/route/useGoBack";
import type { RouteAnimation } from "@shared/types/route";

interface V1HeaderProps {
  title: string;
  animation?: RouteAnimation;
}

const V1Header = ({ title, animation }: V1HeaderProps) => {
  const { handleGoBack } = useGoBack(animation);

  return (
    <header className="flex h-11 w-full items-center gap-2 sticky top-0 z-10 bg-inherit">
      <button type="button" aria-label="뒤로 가기" onClick={handleGoBack}>
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
