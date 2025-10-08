"use client";

import { useMyProfileFormContext } from "@hooks/feature/form/useMyProfileForm";
import useCheckNicknameDuplicatedMutate from "@hooks/feature/query/mutate/useCheckNicknameDuplicatedMutate";
import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import Button from "@shared/ui/Button";
import TextField from "@shared/ui/TextField";
import { Suspense } from "@suspensive/react";
import * as z from "zod";

export type NicknameHelperState =
  | "INVALID" // 유효하지 않은 상태. 유효하지 않다는 문구 띄움
  | "FIT" // 유효한 상태. 확인 버튼 누르면 중복 검사. 아무것도 안띄움. 기본 상태
  | "DUPLICATED" // 중복된 상태. 중복되었다는 문구 띄움
  | "NEEDS_CHECK"; // 중복 검사 필요 상태. 확인 버튼 누르면 중복 검사. "닉네임 확인 버튼을 눌러주세요." 띄움

const nicknameSchema = z
  .string()
  .min(2)
  .max(12)
  .regex(
    /^[가-힣a-zA-Z0-9]{1,12}$/,
    "공백 없이 12자 이내 한글, 영문, 숫자만 입력 가능",
  );

const NicknameField = Suspense.with(
  {
    fallback: null,
  },
  () => {
    const { watch, setValue } = useMyProfileFormContext();
    const {
      data: { nickname: prevNickname },
    } = useProfileQuery();
    const { mutate: checkNicknameDuplicated } =
      useCheckNicknameDuplicatedMutate();

    const handleChange = (nickname: string) => {
      setValue("nickname", nickname);
      if (prevNickname !== nickname) setValue("isValidNickname", false);
      else setValue("isValidNickname", true);

      const result = nicknameSchema.safeParse(nickname);

      if (result.success) {
        setValue("nicknameHelperState", "FIT");
        return;
      }

      setValue("nicknameHelperState", "INVALID");
    };

    return (
      <TextField
        label="닉네임"
        value={watch("nickname")}
        onChange={(e) => handleChange(e.target.value)}
        helperText={
          watch("nicknameHelperState") === "INVALID"
            ? "공백 없이 12자 이내 한글, 영문, 숫자만 입력 가능"
            : watch("nicknameHelperState") === "DUPLICATED"
              ? "이미 사용 중인 닉네임입니다"
              : watch("nicknameHelperState") === "NEEDS_CHECK"
                ? "닉네임 확인 버튼을 눌러주세요. "
                : undefined
        }
        max={12}
        onBlur={() => {
          if (
            watch("isValidNickname") === false &&
            watch("nicknameHelperState") !== "FIT"
          )
            setValue("nicknameHelperState", "NEEDS_CHECK");
        }}
        right={
          <Button
            size={"sm"}
            disabled={
              watch("nicknameHelperState") !== "FIT" ||
              watch("isValidNickname") === true
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              const currentState = watch("nicknameHelperState");
              if (currentState !== "FIT" && currentState !== "NEEDS_CHECK")
                return;

              checkNicknameDuplicated(
                { nickname: watch("nickname") },
                {
                  onSuccess: () => {
                    setValue("isValidNickname", true);
                    setValue("nicknameHelperState", "FIT");
                  },
                  onError: () => {
                    setValue("isValidNickname", false);
                    setValue("nicknameHelperState", "DUPLICATED");
                  },
                },
              );
            }}
          >
            확인
          </Button>
        }
      />
    );
  },
);

export default NicknameField;
