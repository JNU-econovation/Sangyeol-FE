"use client";

import { useChangeNumberForm } from "@hooks/feature/form/useChangeNumberForm";
import Spacing from "@shared/layout/Spacing";
import { Suspense } from "@suspensive/react";
import { FormProvider } from "react-hook-form";

import ChangeNumberFormSectionLoader from "./loader";
import PhoneNumberField from "./PhoneNumberField";
import SubmitButton from "./SubmitButton";
import VerificationField from "./VerificationField";

const ChangeNumberFormSection = Suspense.with(
  {
    fallback: <ChangeNumberFormSectionLoader />,
    clientOnly: true,
  },
  () => {
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
  },
);

export default ChangeNumberFormSection;
