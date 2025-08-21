"use client";

import useLogoutModal from "@hooks/feature/modal/useLogoutModal";
import Text from "@shared/ui/Text";

export default function LogoutButton() {
  const { openLogoutModal } = useLogoutModal();

  return (
    <button onClick={openLogoutModal} className="w-full">
      <Text fontSize="text-sm" color="text-main-green">
        로그아웃
      </Text>
    </button>
  );
}
