"use client";

import { useChangeNumberForm } from "@hooks/feature/form/useChangeNumberForm";
import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";

import { FormProvider } from "react-hook-form";
import PhoneNumberField from "./PhoneNumberField";
import VerificationField from "./VerificationField";

export default function ChangeNumberFormSection() {
  const formProvider = useChangeNumberForm();

  return (
    <section>
      <FormProvider {...formProvider}>
        <form>
          <PhoneNumberField />
          <Spacing size={8} />
          <VerificationField />
          <Spacing size={20} />
          <Button fullWidth onClick={() => {}}>
            변경하기
          </Button>
        </form>
      </FormProvider>
    </section>
  );
}
