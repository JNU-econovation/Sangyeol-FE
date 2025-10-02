import { useForm, useFormContext } from "react-hook-form";

interface ChangeNumberFormValues {
  phoneNumber?: string;
  verificationCode?: string;
  verificationDeadline?: number;
  phoneNumberVerificationCount?: number;
  isPhoneNumberValid?: boolean;
  verificationFieldHelperState?: "NONE" | "SUCCESS" | "ERROR" | "TIMEOUT";
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
