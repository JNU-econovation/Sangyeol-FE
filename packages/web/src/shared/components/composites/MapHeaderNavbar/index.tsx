"use client";

import MAP from "@shared/constants/map";
import MapHeaderTag from "@shared/components/primitives/ui/MapHeaderTag";
import { Suspense } from "@suspensive/react";
import BackButton from "@modules/features/route/BackButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default Suspense.with(
  { name: "MapHeaderNavbar" },
  function MapHeaderNavbar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const selectedTagIds = searchParams.getAll("tag") as (
      | keyof typeof MAP.BASE_AND_FACILITY
      | typeof MAP.BASE.id
    )[];

    const mapHeaderTags = useMemo(() => {
      return (
        Object.keys(
          MAP.BASE_AND_FACILITY,
        ) as (keyof typeof MAP.BASE_AND_FACILITY)[]
      ).map((id) => ({
        id,
        text: MAP.BASE_AND_FACILITY[id as keyof typeof MAP.BASE_AND_FACILITY]
          .facilityName,
      }));
    }, []);

    return (
      <section className="flex w-full overflow-hidden gap-4">
        <BackButton />
        <div className="flex-1 min-w-0">
          <ul className="flex hide-scrollbar overflow-x-scroll gap-4">
            {mapHeaderTags.map(({ id, text }) => (
              <li key={text} className="flex-shrink-0">
                <MapHeaderTag
                  text={text}
                  isSelected={selectedTagIds.includes(id)}
                  onClickHandler={() => {
                    const params = new URLSearchParams(window.location.search);
                    const idStr = String(id);
                    const current = params.getAll("tag");
                    if (current.includes(idStr)) {
                      const next = current.filter((t) => t !== idStr);
                      params.delete("tag");
                      next.forEach((t) => params.append("tag", t));
                    } else {
                      params.append("tag", idStr);
                    }
                    router.replace(
                      `${window.location.pathname}?${params.toString()}`,
                    );
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  },
);
