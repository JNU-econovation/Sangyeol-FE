"use client";

import { PropsWithChildren, useEffect, useState } from "react";

import Tab from "./components/Tab";
import TabContent from "./components/TabContent";
import TabList from "./components/TabLIst/index";
import TabContext from "./context/TabContext/index";
import type { TabContextType } from "./types";

//TODO: 탭이 변경되면 상단으로 스크롤 되도록 구현하기
//TODO: 탭이 변경되면 해당 탭 전체가 화면에 보이도록 탭 리스트 스크롤 되도록 구현하기

interface TabProps extends PropsWithChildren {
  onChange?: (selectedTab: string | null) => void;
}

export default function Tabs({ onChange, children }: TabProps) {
  const [tabItems, setTabItems] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number | null>(null);

  const setTabItemsHandler = (items: string[]) => {
    setTabItems(items);
  };

  const setSelectedTabHandler = (tab: string | null) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    setSelectedTabIndex(tabItems.findIndex((item) => item === selectedTab));
  }, [selectedTab, setSelectedTabIndex, tabItems]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedTab);
    }
  }, [selectedTab, onChange]);

  const value: TabContextType = {
    tabItems,
    selectedTab,
    selectedTabIndex,
    setTabItemsHandler,
    setSelectedTabHandler,
  };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}

Tabs.Content = TabContent;
Tabs.TabList = TabList;
Tabs.Tab = Tab;
