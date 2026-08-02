import { useCallback, useState } from "react";

const useScreenDisable = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const setScreenDisable = useCallback(() => {
    setIsDisabled(true);
  }, []);

  const resetScreenDisable = useCallback(() => {
    setIsDisabled(false);
  }, []);

  return {
    isDisabled,
    setScreenDisable,
    resetScreenDisable,
  };
};

export default useScreenDisable;
