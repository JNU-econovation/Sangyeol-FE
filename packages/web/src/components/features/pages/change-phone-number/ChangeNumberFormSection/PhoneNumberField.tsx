"use client";

import Button from "@/components/common/shared/ui/Button";
import { useChangeNumberFormContext } from "@/hooks/feature/form/useChangeNumberForm";
import TextField from "@shared/ui/TextField";

const PhoneNumberField = () => {
  const { watch, setValue } = useChangeNumberFormContext();

  return (
    <TextField
      label="전화번호"
      type="tel"
      placeholder="010-0000-0000"
      color="white"
      // value={passwordInfo.password}
      onChange={(e) => setValue("phoneNumber", e.target.value)}
      right={<Button size="sm">재요청</Button>}
    />
  );
};

export default PhoneNumberField;
