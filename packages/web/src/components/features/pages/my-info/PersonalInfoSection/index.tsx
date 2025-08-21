"use client";

import useRouteChangePasswordBridge from "@/hooks/feature/bridge/useRouteChangePasswordBridge";
import { usePersonalInfo } from "@hooks/feature/info/usePersonalInfo";
import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import CancelIcon from "@shared/ui/icons/CancelIcon";
import Text from "@shared/ui/Text";
import TextField from "@shared/ui/TextField";

export default function PersonalInfoSection() {
  const { personalInfo, onChangePersonalInfo, onClearPersonalInfo } =
    usePersonalInfo();

  const goToChangePassword = useRouteChangePasswordBridge();

  return (
    <section>
      <Text fontSize="text-sm" fontWeight="font-semibold" color="text-sub-gray">
        내 정보 관리
      </Text>
      <Spacing size={6} />
      <TextField
        label="이름"
        placeholder="홍길동"
        color="white"
        value={personalInfo.name}
        onChange={(e) => onChangePersonalInfo("name", e.target.value)}
        right={
          <div className="flex items-center">
            <button onClick={() => onClearPersonalInfo("name")}>
              <CancelIcon alt="입력 취소" />
            </button>
          </div>
        }
      />
      <Spacing size={8} />
      <TextField
        label="전화번호"
        placeholder="010-0000-0000"
        color="white"
        value={personalInfo.phone}
        onChange={(e) => onChangePersonalInfo("phone", e.target.value)}
        right={
          <div className="flex items-center">
            <button onClick={() => onClearPersonalInfo("phone")}>
              <CancelIcon alt="입력 취소" />
            </button>
          </div>
        }
      />
      <Spacing size={8} />
      <TextField
        label="이메일"
        type="email"
        placeholder="test@naver.com"
        color="white"
        value={personalInfo.email}
        onChange={(e) => onChangePersonalInfo("email", e.target.value)}
        right={
          <div className="flex items-center">
            <button onClick={() => onClearPersonalInfo("email")}>
              <CancelIcon alt="입력 취소" />
            </button>
          </div>
        }
      />
      <Spacing size={8} />
      <TextField
        label="비밀번호"
        type="password"
        placeholder="****"
        color="white"
        value={personalInfo.password}
        onChange={(e) => onChangePersonalInfo("password", e.target.value)}
        right={
          <div className="flex items-center">
            <button onClick={() => onClearPersonalInfo("password")}>
              <CancelIcon alt="입력 취소" />
            </button>
          </div>
        }
      />
      <Spacing size={8} />
      <div className="flex justify-end w-full">
        <Button size={"sm"} onClick={goToChangePassword}>
          비밀번호 변경
        </Button>
      </div>
    </section>
  );
}
