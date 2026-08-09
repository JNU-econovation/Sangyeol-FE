"use client";

import { createContext } from "react";

export interface ModalContextType {
  addModalAsync: (modalComponent: React.ReactNode) => void;
  closeModalAsync: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
