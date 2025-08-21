"use client";

import ROUTE from "@/constants/route";
import { StackLink } from "@/service/StackLink";
import Spacing from "@shared/layout/Spacing";
import MountainBgItem from "@shared/ui/MountainBgItem";

export default function MountainGridSection() {
  return (
    <section className="flex grow gap-4">
      <div className="flex flex-col w-full h-fit gap-4">
        {/* TODO: href 하드코딩 피하기 */}
        <StackLink href={ROUTE.MOUNTAIN_COURSE("1") + "?sort=my"} preLoad>
          <MountainBgItem region="광주" mountainName="무등산" />
        </StackLink>
        <MountainBgItem locked />
      </div>
      <div className="flex flex-col w-full h-fit gap-4">
        <Spacing size={12} />
        <MountainBgItem locked />
        <MountainBgItem locked />
      </div>
    </section>
  );
}
