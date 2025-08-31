import { useState } from "react";

const useFlush = () => {
  const [_, doFlush] = useState(false);

  const flush = () => {
    doFlush((prev) => !prev);
  };

  return { flush };
};

export default useFlush;
