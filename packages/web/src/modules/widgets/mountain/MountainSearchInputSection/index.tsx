"use client";

import ROUTE from "@shared/constants/route";
import {
  CURRENT_SEARCH_LIST_KEY,
  MAX_SEARCH_HISTORY_COUNT,
  NO_RESULT_MOUNTAIN_ID,
} from "@shared/constants/mountain";
import type { MountainSearchHistoryItem } from "@shared/types/mountain";
import useRelatedMountainsQuery from "@shared/api/queries/useRelatedMountainsQuery";
import LinkArrowIcon from "@icons/LinkArrowIcon";
import SearchInput from "@shared/components/primitives/ui/SearchInput";
import Text from "@shared/components/primitives/ui/Text";
import { useCallback, useState } from "react";
import { useStackLinkRouter } from "stack-link";

const MountainSearchInputSection = () => {
  const [searchText, setSearchText] = useState("");
  const { data: relatedMountains } = useRelatedMountainsQuery(searchText);

  const { navigate } = useStackLinkRouter({
    // 우선적으로 임시로 아무 산에 대한 코스 정보를 가져오도록 함. 이는 fallback만 보여줌.
    prefetchHref: ROUTE.MOUNTAIN_COURSE("1"),
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    [setSearchText],
  );

  /**
   * 연관 검색 결과 클릭 시 처리
   *
   * @description
   * 1. 클릭한 산을 검색 이력에 추가 (최대 20개)
   * 2. 해당 산의 코스 목록 페이지로 이동
   *
   * @param param.mountainId - 산 ID
   * @param param.name - 산 이름
   */
  const handleRelatedResultClick = useCallback(
    (param: MountainSearchHistoryItem) => {
      if (typeof window === "undefined") return;

      // 기존 검색 이력 가져오기
      const prevSearchData = JSON.parse(
        localStorage.getItem(CURRENT_SEARCH_LIST_KEY) ?? "[]",
      ) as MountainSearchHistoryItem[];

      // 새 검색을 맨 앞에 추가하고 중복 제거
      const newSearchData = [
        param,
        ...prevSearchData.filter(
          (item) => item.mountainId !== param.mountainId,
        ),
      ].slice(0, MAX_SEARCH_HISTORY_COUNT);

      localStorage.setItem(
        CURRENT_SEARCH_LIST_KEY,
        JSON.stringify(newSearchData),
      );

      navigate({
        href: ROUTE.MOUNTAIN_COURSE(param.mountainId) + "?sort=my",
        animation: "none",
      });
    },
    [navigate],
  );

  /**
   * 직접 검색 버튼 클릭 시 처리
   *
   * @description
   * 검색 결과에 따라 다른 페이지로 이동:
   * - 정확히 1개 결과: 해당 산의 코스 목록으로 이동
   * - 0개 또는 2개 이상: 검색 결과 없음 페이지로 이동 (mountainId = -1)
   *
   * @remarks
   * **임시 구현**:
   * 현재 백엔드에서 "사용자 입력에 대한 정확한 코스 검색 API"가 없어
   * mountainId=-1을 사용하여 결과 없음을 표시합니다.
   *
   * **향후 개선 방향**:
   * 1. 백엔드에서 직접 검색 API 제공 시: 해당 API 연동
   * 2. 프론트엔드 개선: 별도 라우트(/mountain/search?query=xxx) 사용
   *
   * @see NO_RESULT_MOUNTAIN_ID
   * @see {@link https://github.com/JNU-econovation/Sangyeol-FE/issues/61}
   */
  const handleSearchDirectly = useCallback(() => {
    if (!relatedMountains) return;
    if (relatedMountains.suggestedMountainDTOs.length === 1) {
      // 직접 검색하는 경우, 정확하게 산이 있는 경우에는 해당 id로 이동합니다.
      navigate({
        href:
          ROUTE.MOUNTAIN_COURSE(relatedMountains.suggestedMountainDTOs[0].id) +
          "?sort=my",
      });
      return;
    }
    // 정확한 산이 있지 않은 경우, NO_RESULT_MOUNTAIN_ID 페이지로 이동합니다.
    navigate({
      href: ROUTE.MOUNTAIN_COURSE(NO_RESULT_MOUNTAIN_ID) + "?sort=my",
    });
  }, [relatedMountains, navigate]);

  return (
    <section className="relative z-10">
      <SearchInput
        placeholder="산 이름을 입력해 주세요"
        onChange={handleInputChange}
        value={searchText}
        handleSearch={handleSearchDirectly}
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
