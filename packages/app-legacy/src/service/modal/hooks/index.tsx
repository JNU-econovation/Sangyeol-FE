import { useContext } from "react";
import ModalContext from "../context";

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal훅은 ModalProvider 안에서만 사용할 수 있습니다.");
  }

  return context;
};

export default useModal;
