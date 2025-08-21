"use client";

import { useEmergencyPersonalInfo } from "@hooks/feature/info/useEmergencyPersonalInfo";
import CancelIcon from "@icons/CancelIcon";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import TextField from "@shared/ui/TextField";

export default function EmergencyPersonalInfoSection() {
  const {
    emergencyPersonalInfo,
    onChangeEmergencyPersonalInfo,
    onClearEmergencyPersonalInfo,
  } = useEmergencyPersonalInfo();

  return (
    <section>
      <Text fontSize="text-sm" fontWeight="font-semibold" color="text-sub-gray">
        위급 시 개인 정보
      </Text>
      <Spacing size={8} />
      <TextField
        label="몸무게"
        placeholder="100"
        color="white"
        value={emergencyPersonalInfo.weight}
        onChange={(e) =>
          onChangeEmergencyPersonalInfo("weight", e.target.value)
        }
        right={
          <div className="flex items-center gap-2">
            <Text fontSize="text-xl" color="text-sub-gray">
              kg
            </Text>
            <button onClick={() => onClearEmergencyPersonalInfo("weight")}>
              <CancelIcon alt="입력 취소" />
            </button>
          </div>
        }
      />
      <Spacing size={8} />
      <TextField
        label="키"
        placeholder="100"
        color="white"
        value={emergencyPersonalInfo.height}
        onChange={(e) =>
          onChangeEmergencyPersonalInfo("height", e.target.value)
        }
        right={
          <div className="flex items-center gap-2">
            <Text fontSize="text-xl" color="text-sub-gray">
              cm
            </Text>
            <button onClick={() => onClearEmergencyPersonalInfo("height")}>
              <CancelIcon alt="입력 취소" />
            </button>
          </div>
        }
      />
      <Spacing size={8} />
      <TextField
        label="혈액형"
        placeholder="B"
        color="white"
        value={emergencyPersonalInfo.bloodType}
        onChange={(e) =>
          onChangeEmergencyPersonalInfo("bloodType", e.target.value)
        }
        right={
          <div className="flex items-center gap-2">
            <Text fontSize="text-xl" color="text-sub-gray">
              형
            </Text>
            <button onClick={() => onClearEmergencyPersonalInfo("bloodType")}>
              <CancelIcon alt="입력 취소" />
            </button>
          </div>
        }
      />
      <Spacing size={8} />
      {/* <button onClick={openModal} className="flex justify-center w-full">
        <Text
          className="text-center"
          color="text-main-green"
          opacity="opacity-80"
        >
          회원 탈퇴
        </Text>
      </button> */}
      {/* {isOpen && (
        <WithdrawMemberModal closeModal={closeModal} openModal={openModal} />
      )} */}
    </section>
  );
}
