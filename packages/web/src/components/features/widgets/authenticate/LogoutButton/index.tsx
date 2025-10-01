"use client";

import useLogoutModal from "@hooks/feature/modal/useLogoutModal";

export default function LogoutButton() {
  const { openLogoutModal } = useLogoutModal();

  return (
    <button onClick={openLogoutModal}>
      <span className="text-green-900/50 text-sm font-medium">로그아웃</span>
    </button>
  );
}
