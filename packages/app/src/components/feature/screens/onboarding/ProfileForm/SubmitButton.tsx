import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import useProfileMutate from "@hooks/feature/query/mutate/useProfileMutate";
import PositionBottom from "@shared/layout/PositionBottom";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { router } from "expo-router";

const SubmitButton = () => {
  const { getValues, setValue } = useProfileSetFormContext();
  const { mutate: postProfile } = useProfileMutate();

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
        onError: () => {
          //TODO: 명세가 정해진 이후 수정 필요
          setValue("emailFieldHelperState", "DUPLICATED");
        },
      },
    );
  };

  return (
    <PositionBottom>
      <DefaultButton
        title="완료"
        color="mainWhite"
        fullWidth
        onPress={handleSubmit}
      />
    </PositionBottom>
  );
};

export default SubmitButton;
