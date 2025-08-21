"use client";

import { PropsWithChildren, useCallback, useState } from "react";

import ModalContext from "../context";
import CreatePortal from "../components/CreatePortal";
import getQueue from "../core";

export const useFlush = () => {
  const setFlush = useState(0)[1];

  return useCallback(() => {
    setFlush((prev) => prev + 1);
  }, [setFlush]);
};

export default function ModalProvider({ children }: PropsWithChildren) {
  const Queue = getQueue();
  const flush = useFlush();

  const addModalAsync = useCallback(
    (modalComponent: React.ReactNode) => {
      Queue.enqueue(modalComponent);
      flush();
    },
    [Queue, flush]
  );

  const closeModalAsync = useCallback(() => {
    Queue.dequeue();
    flush();
  }, [Queue, flush]);

  const value = { addModalAsync, closeModalAsync };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <div id="modal-root" />
      <CreatePortal />
    </ModalContext.Provider>
  );
}
