"use client";

import useRouteBridge from "@hooks/feature/bridge/useRouteBridge";
import Spacing from "@shared/layout/Spacing";
import GrayRightArrowIcon from "@shared/ui/GrayRightArrowIcon";
import Text from "@shared/ui/Text";

export default function EnvironmentSection() {
  const goToNotificationSettings = useRouteBridge({
    path: "notification-setting",
    routeType: "push",
  });

  return (
    <section className="border-b border-green-600">
      <Spacing size={4} />
      <Text fontSize="text-sm" color="text-primary">
        환경
      </Text>
      <Spacing size={2} />
      <button
        onClick={goToNotificationSettings}
        className="flex items-center justify-between h-10 w-full"
      >
        <span className="text-black text-base font-medium">알림 설정</span>
        <GrayRightArrowIcon width={6} height={10} />
      </button>
      <Spacing size={2} />
      <div className="flex items-center justify-between h-10">
        <span className="text-base font-medium text-primary opacity-50">
          버전 정보
        </span>
        <span className="text-base font-medium text-primary opacity-50">
          {"2.0.0"}
        </span>
      </div>
    </section>
  );
}
