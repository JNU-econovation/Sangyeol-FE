import { memo } from "react";

import useTabContext from "../../hooks/useTabContext";
import type { TabContentProps, TabContentChildrenProps } from "../../types";

function TabContentImpl<TabLabel extends string = string>({
  children,
}: TabContentProps<TabLabel>) {
  const { tabItems, selectedTab, selectedTabIndex } = useTabContext();

  return (
    <>
      {children({
        tabItems: tabItems as TabLabel[],
        selectedTab: selectedTab as TabLabel,
        selectedTabIndex,
      })}
    </>
  );
}

const TabContent = memo(TabContentImpl) as typeof TabContentImpl;
export default TabContent;
