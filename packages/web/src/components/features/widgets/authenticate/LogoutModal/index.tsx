"use client";

import { useModalContext } from "@/service/modal";
import useLogoutBridge from "@hooks/feature/bridge/useLogoutBridge";
import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import Dimmed from "@shared/ui/Dimmed";
import Text from "@shared/ui/Text";

export default function LogoutModal() {
  const { closeModalAsync } = useModalContext();
  const logout = useLogoutBridge();

  return (
    <Dimmed
      typeof="button"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModalAsync();
      }}
    >
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-lg shadow-lg p-0 w-72">
          <div className="flex flex-col items-center p-4">
            <Spacing size={10} />
            <Text fontSize="text-base">로그아웃 하시겠습니까?</Text>
            <Spacing size={10} />
            <div className="flex justify-center gap-4 w-full">
              <Button
                color={"gray"}
                onClick={closeModalAsync}
                size={"md"}
                className="grow text-white"
              >
                취소
              </Button>
              <Button size={"md"} className="grow" onClick={logout}>
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dimmed>
  );
}
