import { ApiError } from "api";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import postBasicInformation from "@hooks/feature/query/mutate/useBasicInformationMutation";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { router } from "expo-router";

const SubmitButton = () => {
  const { getValues, setValue } = useProfileSetFormContext();
  const { mutate: postProfile } = postBasicInformation();

  const handleSubmit = () => {
    const {
      nickname,
      phoneNumber,
      email,
      isNicknameValid,
      isPhoneNumberValid,
      verificationCode,
    } = getValues();

    // nickname validation
    if (!nickname) setValue("nicknameFieldHelperState", "REQUIRE");
    if (!isNicknameValid)
      setValue("nicknameFieldHelperState", "NEED_VERIFICATION");

    // phone number validation
    if (!phoneNumber) setValue("phoneNumberFieldHelperState", "REQUIRE");
    if (!isPhoneNumberValid)
      setValue("phoneNumberFieldHelperState", "NEED_VERIFICATION");

    // verification code validation
    if (!verificationCode) setValue("verificationFieldHelperState", "REQUIRE");

    if (!email) setValue("emailFieldHelperState", "REQUIRE");

    const hasError =
      !nickname ||
      !isNicknameValid ||
      !phoneNumber ||
      !email ||
      (!isPhoneNumberValid &&
        (!verificationCode || `${verificationCode}`.length !== 6));
    if (hasError) return;

    postProfile(
      { email, nickname, phoneNumber: `010-${phoneNumber}` },
      {
        onSuccess: () => {
          router.replace("/(tabs)/home");
        },
        onError: (error) => {
          if (ApiError.isApiError(error)) {
            if (error.errorCode === "USER400_002") {
              setValue("phoneNumberFieldHelperState", "DUPLICATED");
            }
          }
          // TODO: 현재로서는 핸드폰 에러가 아니라면 모두 이메일 에러로 간주
          else setValue("emailFieldHelperState", "DUPLICATED");
        },
      },
    );
  };

  return (
    <DefaultButton
      title="완료"
      color="mainWhite"
      fullWidth
      onPress={handleSubmit}
    />
  );
};

export default SubmitButton;
