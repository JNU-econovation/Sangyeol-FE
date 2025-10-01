"use client";

import useRouteBridge from "@/hooks/feature/bridge/useRouteBridge";
import Spacing from "@shared/layout/Spacing";
import GrayRightArrowIcon from "@shared/ui/GrayRightArrowIcon";
import Text from "@shared/ui/Text";

export default function CustomerCenterSection() {
  const goToFaq = useRouteBridge({
    path: "customer-center",
    routeType: "push",
    params: [{ tab: "faq" }],
  });

  const goToInquiry = useRouteBridge({
    path: "customer-center",
    routeType: "push",
    params: [{ tab: "문의하기" }],
  });

  const goToCheckTerms = useRouteBridge({
    path: "check-terms",
    routeType: "push",
  });

  return (
    <section className="border-b border-green-600">
      <span className="text-green-900/50 text-sm font-medium">고객 센터</span>
      <Spacing size={2} />
      {/* <button
        onClick={goToFaq}
        className="flex items-center justify-between h-10 w-full"
      >
        <span className="text-base font-medium">자주 묻는 질문</span>
        <GrayRightArrowIcon width={6} height={10} />
      </button> */}
      <button
        onClick={goToInquiry}
        className="flex items-center justify-between h-10 w-full"
      >
        <span className="text-black text-base font-medium">문의하기</span>
        <GrayRightArrowIcon width={6} height={10} />
      </button>
      <button
        onClick={goToCheckTerms}
        className="flex items-center justify-between h-10 w-full"
      >
        <span className="text-black text-base font-medium">약관 확인</span>
        <GrayRightArrowIcon width={6} height={10} />
      </button>
      <Spacing size={2} />
    </section>
  );
}
