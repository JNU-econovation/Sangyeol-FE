"use client";

import { useMyProfileForm } from "@hooks/feature/form/useMyProfileForm";
import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import Spacing from "@shared/layout/Spacing";
import { Button } from "@shared/ui/Button";
import TextField from "@shared/ui/TextField";
import { Suspense } from "@suspensive/react";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

import ProfileFormSectionLoader from "./loader";
import useMyProfileMutation from "@/hooks/feature/query/mutate/useMyProfileMutation";

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
        name,
        nickname,
        phoneNumber,
        weight,
        etc,
      },
    } = useProfileQuery();
    const { mutate: updateProfile } = useMyProfileMutation();

    const { setValue, watch, handleSubmit } = useMyProfileForm();

    useEffect(() => {
      setValue("nickname", nickname);
      setValue("email", email);
      setValue("height", height);
      setValue("weight", weight);
      setValue("bloodType", bloodType);
      setValue("etc", etc);
    }, [bloodType, email, etc, height, nickname, setValue, weight]);

    return (
      <form
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   handleSubmit((data) => {
      //     updateProfile(data);
      //   });
      // }}
      >
        <TextField label="이름" value={name} disabled />
        <Spacing size={8} />
        <TextField
          label="닉네임"
          value={watch("nickname")}
          onChange={(e) => setValue("nickname", e.target.value)}
        />
        <Spacing size={8} />
        <TextField
          label="전화번호"
          placeholder="010-0000-0000"
          color="white"
          value={phoneNumber}
          disabled
          right={
            <Button size={"sm"} onClick={() => alert("인증하기")}>
              인증하기
            </Button>
          }
        />
        <Spacing size={8} />
        <TextField
          label="이메일"
          type="email"
          placeholder="test@naver.com"
          color="white"
          value={watch("email")}
          onChange={(e) => setValue("email", e.target.value)}
        />
        <Spacing size={8} />
        <span className="text-gray-900 text-sm font-medium">
          위급 시 개인 정보
        </span>
        <Spacing size={8} />
        <TextField
          label="몸무게"
          placeholder="100"
          color="white"
          value={watch("weight")}
          type="number"
          onChange={(e) => setValue("weight", +e.target.value)} //TODO: 타입 안정성 챙기기 string -> number
        />
        <Spacing size={8} />
        <TextField
          label="키"
          placeholder="100"
          color="white"
          value={watch("height")}
          type="number"
          onChange={(e) => setValue("height", +e.target.value)} //TODO: 타입 안정성 챙기기 string -> number
        />
        <Spacing size={8} />
        <TextField
          label="혈액형"
          placeholder="B"
          color="white"
          value={watch("bloodType")}
          onChange={(e) => {
            //TODO: select box로 변경
            setValue("bloodType", e.target.value);
          }}
        />
        <Spacing size={8} />
        <TextField
          label="기타 사항"
          subtitle="추가 정보를 입력해주세요."
          color="white"
          value={watch("etc")}
          onChange={(e) => setValue("etc", e.target.value)}
        />
        <Spacing size={8} />
        <Button
          size="lg"
          fullWidth
          onClick={handleSubmit((data) => {
            updateProfile(data);
          })}
        >
          저장하기
        </Button>
      </form>
    );
  },
);

export default ProfileFormSection;
