"use client";

import { useMyProfileForm } from "@hooks/feature/form/useMyProfileForm";
import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import Spacing from "@shared/layout/Spacing";
import { Suspense } from "@suspensive/react";
import { useLayoutEffect } from "react";

import ProfileFormSectionLoader from "./loader";

import { FormProvider } from "react-hook-form";
import BloodTypeField from "./BloodTypeField";
import EmailField from "./EmailField";
import HeightField from "./HeightField";
import NameField from "./NameField";
import NicknameField from "./NicknameField";
import PhoneNumberField from "./PhoneNumberField";
import SubmitButton from "./SubmitButton";
import WeightField from "./WeightField";
import EtcField from "./EtcField";

const ProfileFormSection = Suspense.with(
  {
    fallback: <ProfileFormSectionLoader />,
    clientOnly: true,
  },
  () => {
    const {
      data: { bloodType, email, height, nickname, weight, etc },
    } = useProfileQuery();

    const methods = useMyProfileForm();

    const { setValue } = methods;

    // 초기값 세팅
    useLayoutEffect(() => {
      setValue("nickname", nickname);
      setValue("email", email);
      setValue("height", height);
      setValue("weight", weight);
      setValue("bloodType", bloodType);
      setValue("etc", etc);
    }, [bloodType, email, etc, height, nickname, setValue, weight]);

    return (
      <FormProvider {...methods}>
        <form>
          <NameField />
          <Spacing size={8} />
          <NicknameField />
          <Spacing size={8} />
          <PhoneNumberField />
          <Spacing size={8} />
          <EmailField />
          <Spacing size={8} />
          <span className="text-gray-900 text-sm font-medium">
            위급 시 개인 정보
          </span>
          <Spacing size={8} />
          <WeightField />
          <Spacing size={8} />
          <HeightField />
          <Spacing size={8} />
          <BloodTypeField />
          <Spacing size={8} />
          <EtcField />
          <Spacing size={8} />
          <SubmitButton />
        </form>
      </FormProvider>
    );
  },
);

export default ProfileFormSection;
