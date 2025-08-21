"use client";

import { createContext } from "react";

interface ModalContextType {
  addModalAsync: (modalComponent: React.ReactNode) => void;
  closeModalAsync: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
