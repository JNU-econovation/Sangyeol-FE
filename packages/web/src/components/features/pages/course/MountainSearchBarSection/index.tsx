"use client";

import useRouteBridge from "@hooks/feature/bridge/useRouteBridge/index";
import LeftChevronIcon from "@icons/LeftChevronIcon";
import Spacing from "@shared/layout/Spacing";
import SearchInput from "@shared/ui/SearchInput";
import TagItemWithCancel from "@shared/ui/TagItemWithCancel";
import { useCallback, useEffect, useRef, useState } from "react";

export default function MountainSearchBarSection() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentSearchTexts, setCurrentSearchTexts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const routeCourseList = useRouteBridge({
    path: "mountain-course",
    routeType: "push",
    params: [{ mountainName: searchText }],
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prevSearchTexts = JSON.parse(
      localStorage.getItem("currenMountainSearchList") ?? "[]"
    );

    setCurrentSearchTexts(prevSearchTexts);
  }, []);

  useEffect(() => {
    if (!submitted) return;
    routeCourseList();

    setSearchText("");
    setIsFocused(false);
    setSubmitted(false);
  }, [routeCourseList, submitted]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    [setSearchText]
  );

  const handleSearch = useCallback(() => {
    if (typeof window === "undefined") return;

    const set = new Set<string>();
    set.add(searchText);
    currentSearchTexts.forEach((text) => set.add(text));

    const newCurrentSearchTexts = JSON.stringify([...set].filter(Boolean));

    localStorage.setItem("currenMountainSearchList", newCurrentSearchTexts);

    setCurrentSearchTexts([...set]);
    setSubmitted(true);
  }, [currentSearchTexts, searchText]);

  const handleDeleteAll = useCallback(() => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("currenMountainSearchList");
    setCurrentSearchTexts([]);
  }, []);

  const handleClickTag = useCallback((mountainName: string) => {
    setSearchText(mountainName);
    setSubmitted(true);
  }, []);

  const handleClickCancel = useCallback(
    (text: string) => {
      const newCurrentSearchTexts = currentSearchTexts.filter(
        (item) => item !== text
      );
      setCurrentSearchTexts(newCurrentSearchTexts);
      localStorage.setItem(
        "currenMountainSearchList",
        JSON.stringify(newCurrentSearchTexts)
      );
    },
    [currentSearchTexts]
  );

  return (
    <>
      {isFocused ? (
        <div className="absolute top-0 right-0 w-full h-full z-20 bg-white flex flex-col px-6">
          <Spacing size={16} />

          <button onClick={() => setIsFocused(false)}>
            <LeftChevronIcon alt="뒤로 가기" />
          </button>

          <Spacing size={8} />
          <SearchInput
            inputRef={inputRef}
            placeholder="산 이름을 입력해주세요"
            onFocus={() => setIsFocused(true)}
            onChange={handleInputChange}
            value={searchText}
            handleSearch={handleSearch}
            autoFocus
          />

          <Spacing size={8} />
          <div className="flex justify-between">
            <span className="text-xl">최근 검색어</span>
            <button onClick={handleDeleteAll}>
              <span className="text-sm">전체 삭제</span>
            </button>
          </div>
          <Spacing size={5} />
          <div className="flex flex-row gap-2 flex-wrap">
            {currentSearchTexts.map((text, index) => (
              <TagItemWithCancel
                key={index}
                text={text}
                onClickTag={() => handleClickTag(text)}
                onClickCancel={() => {
                  handleClickCancel(text);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <SearchInput
          inputRef={inputRef}
          placeholder="산 이름을 입력해주세요"
          onFocus={() => setIsFocused(true)}
        />
      )}
    </>
  );
}
