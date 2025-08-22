import type { BorderColorType } from "@/types/css";

export interface TabContextType {
  tabItems: string[];
  setTabItemsHandler: (items: string[]) => void;
  selectedTab: string | null;
  selectedTabIndex: number | null;
  setSelectedTabHandler: (tab: string | null) => void;
}

export interface TabListProps {
  children: React.ReactNode[];
}

export interface TabContentChildrenProps<TabLabel extends string = string> {
  tabItems: TabLabel[];
  selectedTab: TabLabel | null;
  selectedTabIndex: number | null;
}

export interface TabContentProps<TabLabel extends string = string> {
  children: (props: TabContentChildrenProps<TabLabel>) => React.ReactNode;
}

export interface TabProps {
  label: string;
  defaultSelected?: boolean;
  selectedColor?: BorderColorType;
  defaultColor?: BorderColorType;
  grow?: boolean;
}
