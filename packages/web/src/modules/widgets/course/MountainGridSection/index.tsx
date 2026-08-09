"use client";

import ROUTE from "@shared/constants/route";
import { StackLink } from "stack-link";
import Spacing from "@shared/components/primitives/layout/Spacing";
import MountainBgItem from "@shared/components/primitives/ui/MountainBgItem";
import useHapticBridge from "@shared/hooks/domain/bridge/useHapticBridge";

export default function MountainGridSection() {
  const hapticFeedback = useHapticBridge();

  return (
    <section className="flex grow gap-4">
      <div className="flex flex-col w-full h-fit gap-4">
        {/* TODO: href 하드코딩 피하기 */}
        <StackLink href={ROUTE.MOUNTAIN_COURSE("1") + "?sort=my"} preLoad>
          <MountainBgItem region="광주" mountainName="무등산" />
        </StackLink>
        <button onClick={hapticFeedback} aria-label="산 준비 중">
          <MountainBgItem locked />
        </button>
      </div>
      <div className="flex flex-col w-full h-fit gap-4">
        <Spacing size={12} />
        <button onClick={hapticFeedback} aria-label="산 준비 중">
          <MountainBgItem locked />
        </button>
        <button onClick={hapticFeedback} aria-label="산 준비 중">
          <MountainBgItem locked />
        </button>
      </div>
    </section>
  );
}
