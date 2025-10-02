"use client";

import { useChangeNumberFormContext } from "@hooks/feature/form/useChangeNumberForm";
import { Button } from "@shared/ui/Button";
import TextField from "@shared/ui/TextField";

const VerificationField = () => {
  const { setValue } = useChangeNumberFormContext();
  return (
    <TextField
      label="인증번호"
      type="tel"
      color="white"
      // value={passwordInfo.newPassword}
      onChange={(e) => setValue("verificationCode", e.target.value)}
      right={<Button size="sm">확인</Button>}
    />
  );
};

export default VerificationField;
