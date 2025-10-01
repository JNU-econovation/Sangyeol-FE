"use client";

import useMyProfileMutation from "@/hooks/feature/query/mutate/useMyProfileMutation";
import { useMyProfileFormContext } from "@hooks/feature/form/useMyProfileForm";
import Button from "@shared/ui/Button";

const SubmitButton = () => {
  const { mutate: updateProfile } = useMyProfileMutation();
  const { handleSubmit } = useMyProfileFormContext();

  return (
    <Button
      size="lg"
      fullWidth
      onClick={handleSubmit((data) => {
        updateProfile(data);
      })}
    >
      저장하기
    </Button>
  );
};

export default SubmitButton;
