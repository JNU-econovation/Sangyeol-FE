"use client";

import Text from "@shared/ui/Text";
import useRouteBackBridge from "@/hooks/feature/bridge/useRouteBackBridge";
// import LeftBlackArrowIcon from "@shared/ui/LeftBlackArrowIcon";

export default function ChangePasswordHeaderSection() {
  const goBack = useRouteBackBridge();

  return (
    <header className="border-b border-gray-30 flex flex-col items-center relative">
      <button onClick={goBack} className="absolute left-5">
        {/* <LeftBlackArrowIcon width={35} height={35} /> */}
      </button>
      <Text fontSize="text-2xl" className="pb-3">
        비밀번호 변경
      </Text>
    </header>
  );
}
