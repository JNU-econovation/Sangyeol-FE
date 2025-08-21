import { useContext } from "react";
import TabContext from "../../context/TabContext";

const useTabContext = () => {
  const context = useContext(TabContext);
  if (context === null) {
    throw new Error("해당 컴포넌트는 Tab 컴포넌트 내부에서만 사용 가능합니다.");
  }
  return context;
};

export default useTabContext;
