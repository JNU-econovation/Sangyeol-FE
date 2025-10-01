import { EmailHelperState } from "@pages/my-info/ProfileFormSection/EmailField";
import { NicknameHelperState } from "@pages/my-info/ProfileFormSection/NicknameField";
import { PutProfileRequest } from "api";
import { useForm, useFormContext } from "react-hook-form";

interface MyProfileForm extends PutProfileRequest {
  isValidNickname: boolean;
  nicknameHelperState: NicknameHelperState;
  isValidPhoneNumber: boolean;
  emailFieldHelperState: EmailHelperState;
}

export const useMyProfileForm = () => {
  return useForm<MyProfileForm>({
    defaultValues: {
      nickname: "",
      phoneNumber: "",
      email: "",
      height: 0,
      weight: 0,
      bloodType: "A",
      etc: "",
      isValidNickname: true,
      nicknameHelperState: "FIT",
      isValidPhoneNumber: true,
      emailFieldHelperState: "FIT",
    },
  });
};

export const useMyProfileFormContext = () => {
  return useFormContext<MyProfileForm>();
};
