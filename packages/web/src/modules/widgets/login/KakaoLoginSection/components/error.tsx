"use client";

import useRouteBackBridge from "@shared/hooks/domain/bridge/useRouteBackBridge";
import useShowToastBridge from "@shared/hooks/domain/bridge/useShowToastBridge";

export default function ErrorFallback() {
  const goBack = useRouteBackBridge();
  const showToast = useShowToastBridge();
  showToast({
    type: "error",
    text1: "카카오 로그인 실패",
    text2: "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.",
  });
  goBack();
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <span className="ml-4 text-gray-700 text-2xl">
        로그인에 실패했습니다... 🥲
      </span>
    </div>
  );
}
