"use client";

import getQueue from "../../core";

export default function CreatePortal() {
  const Queue = getQueue();

  if (!Queue.queueItems.length) return null;

  const currentModal = Queue.queueItems[0];

  if (!currentModal) return null;

  return <>{currentModal.modalComponent}</>;
}
