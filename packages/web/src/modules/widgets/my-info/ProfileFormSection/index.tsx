"use client";

import { useMyProfileForm } from "@shared/hooks/domain/form/useMyProfileForm";
import useProfileQuery from "@shared/api/suspenseQueries/useProfileQuery";
import Spacing from "@shared/components/primitives/layout/Spacing";
import { Suspense } from "@suspensive/react";
import { useLayoutEffect } from "react";
import { FormProvider } from "react-hook-form";

import ProfileFormSectionLoader from "./components/loader";

import BloodTypeField from "./components/BloodTypeField";
import EmailField from "./components/EmailField";
import EtcField from "./components/EtcField";
import HeightField from "./components/HeightField";
import NameField from "./components/NameField";
import NicknameField from "./components/NicknameField";
import PhoneNumberField from "./components/PhoneNumberField";
import SubmitButton from "./components/SubmitButton";
import WeightField from "./components/WeightField";

const ProfileFormSection = Suspense.with(
  {
    fallback: <ProfileFormSectionLoader />,
    clientOnly: true,
  },
  () => {
    const {
      data: {
        bloodType,
        email,
        height,
        nickname,
        weight,
        etc,
        phoneNumber,
        name,
      },
    } = useProfileQuery();

    const methods = useMyProfileForm();

    const { setValue } = methods;

    // 초기값 세팅
    useLayoutEffect(() => {
      setValue("name", name);
      setValue("nickname", nickname);
      setValue("email", email);
      setValue("height", height);
      setValue("weight", weight);
      setValue("bloodType", bloodType);
      setValue("etc", etc);
      setValue("phoneNumber", phoneNumber);
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
          <HeightField />
          <Spacing size={8} />
          <WeightField />
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
