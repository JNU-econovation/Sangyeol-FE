"use client";

import { useChangeNumberFormContext } from "@shared/hooks/domain/form/useChangeNumberForm";
import useMyProfileMutation from "@shared/api/mutates/useMyProfileMutation";
import useProfileQuery from "@shared/api/suspenseQueries/useProfileQuery";
import Button from "@shared/components/primitives/ui/Button";
import { Suspense } from "@suspensive/react";
import { useStackLinkBack } from "stack-link";

const SubmitButton = Suspense.with(
  {
    fallback: (
      <Button fullWidth disabled>
        변경하기
      </Button>
    ),
  },
  () => {
    const { goBack } = useStackLinkBack();
    const { watch } = useChangeNumberFormContext();
    const { data: prevProfileData } = useProfileQuery();
    const { mutate: updateProfile } = useMyProfileMutation();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (!prevProfileData) return;
      updateProfile(
        {
          ...prevProfileData,
          phoneNumber: `010-${watch("phoneNumber")}`,
        },
        {
          onSuccess: () => {
            goBack({});
          },
          //TODO: 에러 처리 추가하기
          onError: (e) => {
            console.error(e);
          },
        },
      );
    };

    return (
      <Button
        fullWidth
        onClick={handleClick}
        disabled={watch("verificationFieldHelperState") !== "SUCCESS"}
      >
        변경하기
      </Button>
    );
  },
);

export default SubmitButton;
