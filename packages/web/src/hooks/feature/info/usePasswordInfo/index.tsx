import { useState } from "react";

export const usePasswordInfo = () => {
  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    newPassword: "",
  });

  const onChangePasswordInfo = (
    key: keyof typeof passwordInfo,
    value: string
  ) => {
    setPasswordInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onClearPasswordInfo = (key: keyof typeof passwordInfo) => {
    setPasswordInfo((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  return {
    passwordInfo,
    onChangePasswordInfo,
    onClearPasswordInfo,
  };
};
