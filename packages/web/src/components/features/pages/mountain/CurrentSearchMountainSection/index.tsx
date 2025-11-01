"use client";

import ROUTE from "@/constants/route";
import useFlush from "@/hooks/common/useFlush";
import Spacing from "@shared/layout/Spacing";
import TagItemWithCancel from "@shared/ui/TagItemWithCancel";
import { useCallback } from "react";
import { useStackLinkRouter } from "stack-link";

const CurrentSearchMountainSection = () => {
  const { flush } = useFlush();
  const { navigate } = useStackLinkRouter({
    prefetchHref: ROUTE.MOUNTAIN_COURSE("1"),
  });

  const handleClickTag = useCallback(
    (param: { mountainId: string; name: string }) => {
      const filteredSearchData = JSON.parse(
        localStorage.getItem("currenMountainSearchList"),
      ).filter(({ mountainId }) => mountainId !== param.mountainId);

      localStorage.setItem(
        "currenMountainSearchList",
        JSON.stringify([param, ...filteredSearchData]),
      );

      navigate({
        href: ROUTE.MOUNTAIN_COURSE(param.mountainId) + "?sort=my",
      });
    },
    [],
  );

  const handleClickCancel = useCallback(
    (text: { mountainId: string; name: string }) => {
      const prevData = JSON.parse(
        localStorage.getItem("currenMountainSearchList"),
      ) as { mountainId: string; name: string }[];

      const newCurrentSearchData = prevData.filter(
        (item) => item.mountainId !== text.mountainId,
      );

      localStorage.setItem(
        "currenMountainSearchList",
        JSON.stringify(newCurrentSearchData),
      );
      flush();
    },
    [],
  );

  const handleDeleteAll = useCallback(() => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("currenMountainSearchList");
    flush();
  }, []);

  if (typeof window === "undefined") return null;

  const prevData = JSON.parse(
    localStorage.getItem("currenMountainSearchList"),
  ) as { mountainId: string; name: string }[];

  return (
    <section className="min-h-24">
      <div className="flex justify-between">
        <span className="text-md font-semibold text-gray-900">최근 검색어</span>
        <button onClick={handleDeleteAll}>
          <span className="text-sm font-semibold text-gray-900">전체 삭제</span>
        </button>
      </div>
      <Spacing size={5} />
      <div className="flex flex-row gap-2 flex-wrap">
        {prevData &&
          prevData.map(({ mountainId, name }, index) => (
            <TagItemWithCancel
              key={index}
              text={name}
              onClickTag={() => handleClickTag({ mountainId, name })}
              onClickCancel={() => {
                handleClickCancel({ mountainId, name });
              }}
            />
          ))}
      </div>
    </section>
  );
};

export default CurrentSearchMountainSection;
