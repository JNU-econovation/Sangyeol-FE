import ModalQueue from "./ModalQueue";

let Queue: ModalQueue | null = null;

const getQueue = (): ModalQueue => {
  if (typeof window === "undefined") {
    return new ModalQueue();
  }

  if (!Queue) {
    Queue = new ModalQueue();
  }

  return Queue;
};

export default getQueue;
