import { useContext } from "react";
import NoticeBarContext from "../../context";

const useNoticeBar = () => {
  const context = useContext(NoticeBarContext);
  if (context === undefined) {
    throw new Error(
      "useNoticeBar 훅은 NoticeBarProvider 내에서만 사용할 수 있습니다.",
    );
  }
  return context;
};

export default useNoticeBar;
