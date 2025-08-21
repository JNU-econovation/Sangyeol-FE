"use client";

import MAP from "@/constants/map";
import { updateSearchParams } from "@/utils/url";
import MapHeaderTag from "@shared/ui/MapHeaderTag";
import BackButton from "@/components/features/widgets/route/BackButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Suspense } from "@suspensive/react";

export default Suspense.with(
  { name: "MapHeaderNavbar" },
  function MapHeaderNavbar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const selectedTagId = searchParams.get("tag") || MAP.BASE.facilityName;

    const mapHeaderTags = useMemo(() => {
      return [...Object.keys(MAP.BASE_AND_FACILITY)].map((id) => ({
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
                  isSelected={id === selectedTagId}
                  onClickHandler={() => {
                    router.replace(
                      updateSearchParams({
                        href: window.location.href,
                        searchParamName: "tag",
                        paramValue: id,
                      })
                    );
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
);
