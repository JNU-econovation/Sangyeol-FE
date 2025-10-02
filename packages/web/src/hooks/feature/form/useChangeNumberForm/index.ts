import { useForm, useFormContext } from "react-hook-form";

interface ChangeNumberFormValues {
  phoneNumber?: string;
  verificationCode?: string;
}

export const useChangeNumberForm = () => {
  return useForm<ChangeNumberFormValues>({
    defaultValues: {
      phoneNumber: "",
      verificationCode: "",
    },
  });
};

export const useChangeNumberFormContext = () => {
  return useFormContext<ChangeNumberFormValues>();
};
