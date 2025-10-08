"use client";

import useUserInfoMutateModal from "@/hooks/feature/modal/useUserInfoMutateModal";
import { useMyProfileFormContext } from "@hooks/feature/form/useMyProfileForm";
import useMyProfileMutation from "@hooks/feature/query/mutate/useMyProfileMutation";
import Button from "@shared/ui/Button";

const SubmitButton = () => {
  const { mutate: updateProfile, isSuccess } = useMyProfileMutation();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = useMyProfileFormContext();

  const { openUserInfoMutateModal } = useUserInfoMutateModal(() => {
    updateProfile(
      {
        nickname: watch("nickname"),
        email: watch("email"),
        height: watch("height"),
        weight: watch("weight"),
        bloodType: watch("bloodType"),
        phoneNumber: watch("phoneNumber"),
        etc: watch("etc"),
      },
      {
        onError() {
          setValue("emailFieldHelperState", "DUPLICATED");
        },
      },
    );
  });

  const checkIsValid = () => {
    if (
      watch("emailFieldHelperState") === "INVALID" ||
      watch("emailFieldHelperState") === "DUPLICATED"
    ) {
      return false;
    }

    // 유효하지 않은 닉네임이면 제출하지 않음
    if (!watch("isValidNickname")) {
      return false;
    }

    // 유효하지 않은 전화번호이면 제출하지 않음
    if (!watch("isValidPhoneNumber")) {
      return false;
    }
    return true;
  };

  return (
    <Button
      size="lg"
      fullWidth
      disabled={!checkIsValid() || !isDirty || isSuccess}
      onClick={handleSubmit((data) => {
        if (!checkIsValid()) return;
        openUserInfoMutateModal();
      })}
    >
      저장하기
    </Button>
  );
};

export default SubmitButton;
