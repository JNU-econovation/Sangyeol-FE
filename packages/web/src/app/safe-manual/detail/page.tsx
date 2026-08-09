import StackHeader from "@shared/components/composites/StackHeader";
import Spacing from "@shared/components/primitives/layout/Spacing";
import SafeManualTab from "@modules/features/etc/SafeManualTab";
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
