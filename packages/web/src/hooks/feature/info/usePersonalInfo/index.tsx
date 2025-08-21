import { useState } from "react";

export const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const onChangePersonalInfo = (
    key: keyof typeof personalInfo,
    value: string
  ) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onClearPersonalInfo = (key: keyof typeof personalInfo) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  return {
    personalInfo,
    onChangePersonalInfo,
    onClearPersonalInfo,
  };
};
