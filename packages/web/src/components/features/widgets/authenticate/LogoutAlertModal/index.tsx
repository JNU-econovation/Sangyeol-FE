import { useRef } from "react";

import useRouteBridge from "@/hooks/feature/bridge/useRouteBridge";
import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import Dimmed from "@shared/ui/Dimmed";
import Text from "@shared/ui/Text";

export default function LogoutAlertModal() {
  const modalRef = useRef<HTMLDivElement>(null!);

  const routeTo = useRouteBridge({
    path: "starter",
    routeType: "replace",
  });

  return (
    <Dimmed typeof="button">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-0 w-72">
          <div className="flex flex-col items-center p-4">
            <Spacing size={10} />
            <Text fontSize="text-base">로그아웃이 완료되었습니다.</Text>
            <Text fontSize="text-base">확인 버튼을 누를 시</Text>
            <Text fontSize="text-base">로그인 화면으로 돌아갑니다.</Text>
            <Spacing size={10} />
            <Button size={"md"} className="grow" onClick={routeTo} fullWidth>
              확인
            </Button>
          </div>
        </div>
      </div>
    </Dimmed>
  );
}
