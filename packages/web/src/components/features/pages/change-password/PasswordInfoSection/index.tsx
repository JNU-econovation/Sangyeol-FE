"use client";

import { usePasswordInfo } from "@hooks/feature/info/usePasswordInfo";
import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import CancelIcon from "@shared/ui/icons/CancelIcon";
import TextField from "@shared/ui/TextField";

export default function PasswordInfoSection() {
  const { onChangePasswordInfo, onClearPasswordInfo, passwordInfo } =
    usePasswordInfo();

  return (
    <section>
      <form>
        <TextField
          label="현재 비밀번호"
          type="password"
          placeholder="****"
          color="white"
          value={passwordInfo.password}
          onChange={(e) => onChangePasswordInfo("password", e.target.value)}
          right={
            <button onClick={() => onClearPasswordInfo("password")}>
              <CancelIcon alt="입력 취소" className="hidden" />
            </button>
          }
        />
        <Spacing size={8} />
        <TextField
          label="새 비밀번호"
          type="password"
          placeholder="****"
          color="white"
          value={passwordInfo.newPassword}
          onChange={(e) => onChangePasswordInfo("newPassword", e.target.value)}
          right={
            <button onClick={() => onClearPasswordInfo("newPassword")}>
              <CancelIcon alt="입력 취소" className="hidden" />
            </button>
          }
        />
        <Spacing size={20} />
        <Button fullWidth>변경하기</Button>
      </form>
    </section>
  );
}
