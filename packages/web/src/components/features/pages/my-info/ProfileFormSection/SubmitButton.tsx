"use client";

import useUserInfoMutateModal from "@/hooks/feature/modal/useUserInfoMutateModal";
import { useMyProfileFormContext } from "@hooks/feature/form/useMyProfileForm";
import useMyProfileMutation from "@hooks/feature/query/mutate/useMyProfileMutation";
import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import Button from "@shared/ui/Button";
import { useMemo } from "react";

const SubmitButton = () => {
  const { mutate: updateProfile, isSuccess } = useMyProfileMutation();
  const {
    handleSubmit,
    setValue,
    watch,
  } = useMyProfileFormContext();

  const {
    data: {
      name: originalName,
      nickname: originalNickname,
      email: originalEmail,
      height: originalHeight,
      weight: originalWeight,
      bloodType: originalBloodType,
      phoneNumber: originalPhoneNumber,
      etc: originalEtc,
    },
  } = useProfileQuery();

  // 현재 폼의 모든 값
  const currentValues = {
    name: watch("name"),
    nickname: watch("nickname"),
    email: watch("email"),
    height: watch("height"),
    weight: watch("weight"),
    bloodType: watch("bloodType"),
    phoneNumber: watch("phoneNumber"),
    etc: watch("etc"),
  };

  // 원본값과 현재값이 다른지 확인
  const hasChanges = useMemo(() => {
    return (
      currentValues.name !== originalName ||
      currentValues.nickname !== originalNickname ||
      currentValues.email !== originalEmail ||
      currentValues.height !== originalHeight ||
      currentValues.weight !== originalWeight ||
      currentValues.bloodType !== originalBloodType ||
      currentValues.phoneNumber !== originalPhoneNumber ||
      currentValues.etc !== originalEtc
    );
  }, [
    currentValues,
    originalName,
    originalNickname,
    originalEmail,
    originalHeight,
    originalWeight,
    originalBloodType,
    originalPhoneNumber,
    originalEtc,
  ]);

  const { openUserInfoMutateModal } = useUserInfoMutateModal(() => {
    updateProfile(
      {
        name: watch("name"),
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
      disabled={!checkIsValid() || !hasChanges || isSuccess}
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
