"use client";

import ROUTE from "@/constants/route";
import useRelatedMountainsQuery from "@hooks/feature/query/query/useRelatedMountainsQuery";
import LinkArrowIcon from "@icons/LinkArrowIcon";
import SearchInput from "@shared/ui/SearchInput";
import Text from "@shared/ui/Text";
import { useCallback, useState } from "react";
import { useStackLinkRouter } from "stack-link";

const MountainSearchInputSection = () => {
  const [searchText, setSearchText] = useState("");
  const { data: relatedMountains } = useRelatedMountainsQuery(searchText);
  // 우선적으로 임시로 아무 산에 대한 코스 정보를 가져오도록 함. 이는 fallback만 보여줌.
  const { navigate } = useStackLinkRouter({
    prefetchHref: ROUTE.MOUNTAIN_COURSE("1"),
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    [setSearchText],
  );

  const handleRelatedResultClick = useCallback(
    (param: { mountainId: string; name: string }) => {
      if (typeof window === "undefined") return;

      const set = [param];
      const prevSearchData = JSON.parse(
        // TODO: 하드코딩 피하기
        localStorage.getItem("currenMountainSearchList") ?? "[]",
      ) as { mountainId: string; name: string }[];

      prevSearchData.forEach((text) => set.push(text));

      const newCurrentSearchData = [...set].filter(Boolean);
      newCurrentSearchData.splice(20); // 최대 20개까지만 저장

      const newCurrentSearchTexts = JSON.stringify(newCurrentSearchData);

      localStorage.setItem("currenMountainSearchList", newCurrentSearchTexts);

      navigate({
        href: ROUTE.MOUNTAIN_COURSE(param.mountainId) + "?sort=my",
        animation: "none",
      });
    },
    [navigate],
  );

  return (
    <section className="relative z-10">
      <SearchInput
        placeholder="산 이름을 입력해 주세요"
        onChange={handleInputChange}
        value={searchText}
        // handleSearch={handleSearch}
        autoFocus
      />
      {relatedMountains && (
        <ul className="shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] w-full min-h-10 -translate-y-7 -z-10 rounded-b-3xl px-5 pt-10 pb-4 flex flex-col gap-3 bg-white absolute">
          {relatedMountains?.suggestedMountainDTOs?.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => handleRelatedResultClick({ mountainId: id, name })}
            >
              <li className="flex items-center justify-between">
                <Text fontSize="text-sm" fontWeight="font-medium">
                  {name}
                </Text>
                <LinkArrowIcon />
              </li>
            </button>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MountainSearchInputSection;
