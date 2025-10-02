"use client";

import { useMyProfileFormContext } from "@hooks/feature/form/useMyProfileForm";
import useMyProfileMutation from "@hooks/feature/query/mutate/useMyProfileMutation";
import Button from "@shared/ui/Button";

const SubmitButton = () => {
  const { mutate: updateProfile } = useMyProfileMutation();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = useMyProfileFormContext();

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
      disabled={!checkIsValid() || !isDirty}
      onClick={handleSubmit((data) => {
        if (!checkIsValid()) return;
        updateProfile(data, {
          onError() {
            setValue("emailFieldHelperState", "DUPLICATED");
          },
        });
      })}
    >
      저장하기
    </Button>
  );
};

export default SubmitButton;
