import { createContext } from "react";
import { NoticeBarContextType } from "../types";

const NoticeBarContext = createContext<NoticeBarContextType>({
  showNotice: () => {},
});

export default NoticeBarContext;
