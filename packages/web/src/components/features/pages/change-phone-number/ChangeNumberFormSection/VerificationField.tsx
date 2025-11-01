"use client";

import { useChangeNumberFormContext } from "@hooks/feature/form/useChangeNumberForm";
import useVerifyPhoneNumber from "@hooks/feature/query/mutate/useVerifyPhoneNumber";
import { timestampToMinutesSeconds } from "@sangyeol/utils";
import { Button } from "@shared/ui/Button";
import TextField from "@shared/ui/TextField";
import { useEffect, useRef, useState } from "react";

const VerificationField = () => {
  const [verificationTimer, setVerificationTimer] = useState<number | null>(
    null,
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { mutate: checkVerificationCode } = useVerifyPhoneNumber();
  const { setValue, watch, getValues } = useChangeNumberFormContext();

  const handlePhoneNumberVerification = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const verificationCode = getValues("verificationCode");
    checkVerificationCode(
      {
        verificationCode,
        phoneNumber: `010-${watch("phoneNumber")}`,
      }, // TODO: 타입 안정성 해결
      {
        onSuccess: () => {
          setValue("verificationFieldHelperState", "SUCCESS");
          setValue("isPhoneNumberValid", true);
          return;
        },
        onError: (error) => {
          setValue("verificationFieldHelperState", "ERROR");
          setValue("isPhoneNumberValid", false);
        },
      },
    );
  };

  useEffect(() => {
    if (watch("verificationDeadline")) {
      timerRef.current = setInterval(() => {
        const remainingTime = watch("verificationDeadline") - Date.now();
        if (remainingTime <= 0) {
          setVerificationTimer(null);
          // setValue("verificationFieldHelperState", "TIMEOUT");
        } else {
          setVerificationTimer(remainingTime);
        }
      }, 200);
    }

    if (watch("isPhoneNumberValid") && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [watch("verificationDeadline"), watch("isPhoneNumberValid")]);

  return (
    <TextField
      label="인증번호"
      type="tel"
      color="white"
      placeholder="인증번호 6자리 입력"
      maxLength={6}
      titleSideComponent={
        <span className="">
          {verificationTimer !== null
            ? timestampToMinutesSeconds(verificationTimer)
            : ""}
        </span>
      }
      onChange={(e) => setValue("verificationCode", e.target.value)}
      right={
        <div className="w-18">
          <Button
            size="sm"
            onClick={handlePhoneNumberVerification}
            disabled={
              watch("phoneNumberVerificationCount") === 0 ||
              watch("verificationCode").length !== 6
              // ||watch("verificationFieldHelperState") !== "NONE"
            }
            className="w-full"
          >
            확인
          </Button>
        </div>
      }
    />
  );
};

export default VerificationField;
