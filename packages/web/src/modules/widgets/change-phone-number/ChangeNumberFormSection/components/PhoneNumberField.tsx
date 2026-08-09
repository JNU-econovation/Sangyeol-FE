"use client";

import { cn } from "@shared/lib/cn";
import { useChangeNumberFormContext } from "@shared/hooks/domain/form/useChangeNumberForm";
import useSMSForVerificationMutate from "@shared/api/mutates/useSMSForVerificationMutate";
import {
  isValidPhoneNumber,
  validateAndFormatPhoneWithoutPrefix,
} from "@sangyeol/utils";
import Button from "@shared/components/primitives/ui/Button";
import TextField from "@shared/components/primitives/ui/TextField";
import { useState } from "react";

const PhoneNumberField = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { setValue, watch } = useChangeNumberFormContext();
  const { mutate: sendSMSVerification } = useSMSForVerificationMutate();

  const handlePhoneNumberVerification = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const phoneNumber = `010-${watch("phoneNumber")}`;
    if (isValidPhoneNumber(phoneNumber)) {
      sendSMSVerification(phoneNumber, {
        onSuccess: () => {
          setValue("verificationDeadline", Date.now() + 1000 * 60 * 5); //5 min
          setValue(
            "phoneNumberVerificationCount",
            watch("phoneNumberVerificationCount") + 1,
          );
        },
      });
    }
  };

  return (
    <TextField
      label="전화번호"
      type="tel"
      placeholder="0000-0000"
      color="white"
      value={watch("phoneNumber")}
      onChange={(e) =>
        setValue(
          "phoneNumber",
          validateAndFormatPhoneWithoutPrefix(e.target.value),
        )
      }
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      maxLength={9}
      paddingInline={10}
      left={
        <span
          className={cn("transition-colors", {
            "!text-black": isFocused || watch("phoneNumber") !== "",
            "text-gray-400": watch("phoneNumber") === "",
          })}
        >
          010-
        </span>
      }
      right={
        <div className="w-18">
          <Button
            size="sm"
            onClick={handlePhoneNumberVerification}
            className="w-full"
          >
            재요청
          </Button>
        </div>
      }
    />
  );
};

export default PhoneNumberField;
