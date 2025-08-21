import { createContext } from "react";

import { TabContextType } from "../../types";

const TabContext = createContext<TabContextType>({
  tabItems: [],
  setTabItemsHandler: () => {},
  selectedTab: null,
  selectedTabIndex: null,
  setSelectedTabHandler: () => {},
});

export default TabContext;
