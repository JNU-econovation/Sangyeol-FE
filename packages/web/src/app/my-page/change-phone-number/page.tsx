//TODO: 페이지 컴포넌트가 클라이언트 컴포넌트임

"use client";

// import ChangeNumberFormSection from "@pages/change-phone-number/ChangeNumberFormSection";
import ChangePhoneNumberHeaderSection from "@pages/change-phone-number/ChangePhoneNumberHeaderSection";
import Spacing from "@shared/layout/Spacing";

import dynamic from "next/dynamic";
const ChangeNumberFormSection = dynamic(
  () => import("@pages/change-phone-number/ChangeNumberFormSection"),
  { ssr: false },
);

export default function ChangePhoneNumberPage() {
  return (
    <div className="p-6">
      <ChangePhoneNumberHeaderSection />
      <Spacing size={12} />
      <ChangeNumberFormSection />
    </div>
  );
}
