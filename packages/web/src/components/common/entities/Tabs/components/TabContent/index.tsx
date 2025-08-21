import { memo } from "react";

import useTabContext from "../../hooks/useTabContext";

interface TabContentChildrenProps<TabLabel extends string = string> {
  tabItems: TabLabel[];
  selectedTab: TabLabel | null;
  selectedTabIndex: number | null;
}
interface TabContentProps<TabLabel extends string = string> {
  children: (props: TabContentChildrenProps<TabLabel>) => React.ReactNode;
}

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
