import { useContext } from "react";

import StackContext from "../../context/stackContext";

const useStackContext = () => {
  const context = useContext(StackContext);
  if (!context) {
    throw new Error("useStackContext must be used within a StackProvider");
  }
  return context;
};

export default useStackContext;
