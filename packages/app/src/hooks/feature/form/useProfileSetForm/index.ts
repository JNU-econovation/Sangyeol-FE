import HELPER from "@constants/inputField/helper";
import { useForm, useFormContext } from "react-hook-form";

interface ProfileFormValues {
  nickname: string;
  phoneNumber: string;
  verificationCode: string;
  email: string;

  // meta
  isNicknameValid: boolean;
  nicknameFieldHelperState: keyof typeof HELPER.PROFILE_FORM.NICKNAME;

  phoneNumberVerificationCount: number;
  phoneNumberFieldHelperState: keyof typeof HELPER.PROFILE_FORM.PHONE_NUMBER;

  isPhoneNumberValid: boolean;
  verificationDeadline: number;
  verificationFieldHelperState: keyof typeof HELPER.PROFILE_FORM.VERIFICATION;

  emailFieldHelperState: keyof typeof HELPER.PROFILE_FORM.EMAIL;
}

const useProfileSetForm = () => {
  return useForm<ProfileFormValues>({
    defaultValues: {
      // form field
      nickname: "",
      phoneNumber: "",
      verificationCode: "",
      email: "",

      // meta
      isNicknameValid: true,
      isPhoneNumberValid: false,
      phoneNumberVerificationCount: 0,
      nicknameFieldHelperState: "NONE",
      phoneNumberFieldHelperState: "NONE",
      verificationFieldHelperState: "NONE",
      emailFieldHelperState: "NONE",
    },
  });
};

export const useProfileSetFormContext = () => {
  return useFormContext<ProfileFormValues>();
};

export default useProfileSetForm;
