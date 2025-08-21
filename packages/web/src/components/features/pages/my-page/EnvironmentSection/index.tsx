"use client";

import useRouteBridge from "@/hooks/feature/bridge/useRouteBridge";
import Spacing from "@shared/layout/Spacing";
import GrayRightArrowIcon from "@shared/ui/GrayRightArrowIcon";
import Text from "@shared/ui/Text";

export default function EnvironmentSection() {
  const goToNotificationSettings = useRouteBridge({
    path: "notification-setting",
    routeType: "push",
  });

  return (
    <section className="border-b border-gray-30">
      <Spacing size={4} />
      <Text fontSize="text-sm" color="text-main-green">
        환경
      </Text>
      <Spacing size={2} />
      <button
        onClick={goToNotificationSettings}
        className="flex items-center justify-between h-10 w-full"
      >
        <Text fontSize="text-base" fontWeight="font-medium">
          알림 설정
        </Text>
        <GrayRightArrowIcon width={6} height={10} />
      </button>
      <Spacing size={2} />
      <div className="flex items-center justify-between h-10">
        <Text
          fontSize="text-base"
          fontWeight="font-medium"
          color="text-main-green"
          opacity={"opacity-50"}
        >
          버전 정보
        </Text>
        <Text
          fontSize="text-base"
          fontWeight="font-medium"
          color="text-main-green"
          opacity={"opacity-50"}
        >
          {"2.0.0"}
        </Text>
      </div>
    </section>
  );
}
