export interface TabContextType {
  tabItems: string[];
  setTabItemsHandler: (items: string[]) => void;
  selectedTab: string | null;
  selectedTabIndex: number | null;
  setSelectedTabHandler: (tab: string | null) => void;
}
