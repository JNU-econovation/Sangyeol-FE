"use client";

import { useChangeNumberForm } from "@hooks/feature/form/useChangeNumberForm";
import Spacing from "@shared/layout/Spacing";
import { FormProvider } from "react-hook-form";

import PhoneNumberField from "./PhoneNumberField";
import SubmitButton from "./SubmitButton";
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
          <SubmitButton />
        </form>
      </FormProvider>
    </section>
  );
}
