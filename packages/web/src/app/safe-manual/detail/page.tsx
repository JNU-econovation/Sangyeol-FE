import StackHeader from "@entities/StackHeader";
import Spacing from "@shared/layout/Spacing";
import SafeManualTab from "@widgets/etc/SafeManualTab";
import { Suspense } from "react";

export default function SafeManualDetailPage() {
  return (
    <div className="h-screen max-h-screen overflow-hidden">
      <Spacing size={5} />
      <StackHeader title="안전 매뉴얼" />
      <Spacing size={5} />
      <Suspense>
        <SafeManualTab />
      </Suspense>
    </div>
  );
}
