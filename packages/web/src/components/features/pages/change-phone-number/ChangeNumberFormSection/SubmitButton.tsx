"use client";

import { useChangeNumberFormContext } from "@hooks/feature/form/useChangeNumberForm";
import useMyProfileMutation from "@hooks/feature/query/mutate/useMyProfileMutation";
import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import Button from "@shared/ui/Button";
import { Suspense } from "@suspensive/react";
import { useState } from "react";
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

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      updateProfile(
        {
          ...prevProfileData,
          phoneNumber: watch("phoneNumber"),
        },
        {
          onSuccess: () => {
            goBack({});
          },
        },
      );
    };

    return (
      <Button
        fullWidth
        onClick={handleClick}
        disabled={
          watch("verificationFieldHelperState") !== "SUCCESS" || isLoading
        }
      >
        변경하기
      </Button>
    );
  },
);

export default SubmitButton;
