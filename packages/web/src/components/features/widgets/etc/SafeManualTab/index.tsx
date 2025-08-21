"use client";

import {
  SAFE_MANUAL_CONTENTS,
  SAFE_MANUAL_TITLES,
} from "@/constants/safeManual";
import Tabs from "@entities/Tabs";
import Spacing from "@shared/layout/Spacing";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SafeManualTab() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const onChangeHandler = useCallback(
    (selectedTab: string | null) => {
      if (selectedTab) {
        const url = `/safe-manual/detail?manual=${selectedTab}`;
        router.replace(url);
      }
    },
    [router]
  );

  return (
    <div className="flex flex-col h-full">
      <Tabs onChange={onChangeHandler}>
        <div className="px-6 border-b border-gray-30">
          <Tabs.TabList>
            {SAFE_MANUAL_TITLES.map((title, index) => (
              <Tabs.Tab
                key={index}
                label={title}
                defaultSelected={
                  title === decodeURIComponent(searchParams.get("manual") || "")
                }
              />
            ))}
          </Tabs.TabList>
        </div>
        <Tabs.Content<keyof typeof SAFE_MANUAL_CONTENTS>>
          {({ selectedTab }) => {
            if (!selectedTab) return null;
            const selectedContent = SAFE_MANUAL_CONTENTS[selectedTab];
            return (
              <div className="px-6 grow h-full overflow-y-scroll hide-scrollbar">
                <Spacing size={12} />
                <p className="font-bold text-3xl text-main-green">
                  {selectedContent.title}
                </p>
                <Spacing size={2} />
                <p>{selectedContent.content}</p>
                <Spacing size={11} />
                <ul className="flex flex-col gap-4">
                  {selectedContent.cases.map(({ Icon, symptom }, index) => {
                    return (
                      <li
                        key={index}
                        className="shadow-sm p-6 rounded-2xl flex items-center gap-4"
                      >
                        {<Icon />}
                        <p className="font-semibold">{symptom}</p>
                      </li>
                    );
                  })}
                </ul>
                <Spacing size={40} />
              </div>
            );
          }}
        </Tabs.Content>
      </Tabs>
    </div>
  );
}
