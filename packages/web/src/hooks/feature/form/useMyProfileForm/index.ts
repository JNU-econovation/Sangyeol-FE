import { PutProfileRequest } from "api";
import { useForm, useFormContext } from "react-hook-form";

export const useMyProfileForm = () => {
  return useForm<PutProfileRequest>({
    defaultValues: {
      nickname: "",
      phoneNumber: "",
      email: "",
      height: 0,
      weight: 0,
      bloodType: "A",
      etc: "",
    },
  });
};

export const useMyProfileFormContext = () => {
  return useFormContext();
};
