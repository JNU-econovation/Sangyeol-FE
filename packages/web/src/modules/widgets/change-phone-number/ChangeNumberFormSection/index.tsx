"use client";

import { useChangeNumberForm } from "@shared/hooks/domain/form/useChangeNumberForm";
import Spacing from "@shared/components/primitives/layout/Spacing";
import { Suspense } from "@suspensive/react";
import { FormProvider } from "react-hook-form";

import ChangeNumberFormSectionLoader from "./components/loader";
import PhoneNumberField from "./components/PhoneNumberField";
import SubmitButton from "./components/SubmitButton";
import VerificationField from "./components/VerificationField";

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
