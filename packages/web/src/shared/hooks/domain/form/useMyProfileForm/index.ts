import { EmailHelperState } from "@modules/widgets/my-info/ProfileFormSection/components/EmailField";
import { NicknameHelperState } from "@modules/widgets/my-info/ProfileFormSection/components/NicknameField";
import { PostProfileRequest } from "api";
import { useForm, useFormContext } from "react-hook-form";

interface MyProfileForm extends PostProfileRequest {
  isValidNickname: boolean;
  nicknameHelperState: NicknameHelperState;
  isValidPhoneNumber: boolean;
  emailFieldHelperState: EmailHelperState;
}

export const useMyProfileForm = () => {
  return useForm<MyProfileForm>({
    defaultValues: {
      name: "",
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
