import CustomerCenterTab from "@modules/features/etc/CustomerCenterTab";
import { Suspense } from "react";

export default function CustomerCenterPage() {
  return (
    <div className="px-6">
      <Suspense>
        <CustomerCenterTab />
      </Suspense>
    </div>
  );
}
