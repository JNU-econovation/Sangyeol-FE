import { createContext, ReactNode } from "react";

import type { Options } from "../models";

export interface ModalContextType {
  modalState: {
    visible: boolean;
    modalProps?: Options;
  };
  openModal: (component: ReactNode, options?: Options) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
