import { createContext, ReactNode } from "react";

export interface ModalContextType {
  modalState: {
    visible: boolean;
  };
  openModal: (component: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
