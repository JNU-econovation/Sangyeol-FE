import ManualGridSection from "@pages/safe-manual/ManualGridSection";
import ManualSearchInput from "@pages/safe-manual/ManualSearchInput";
import Spacing from "@shared/layout/Spacing";

export default function page() {
  return (
    <div className="px-6">
      <Spacing size={16} />
      <ManualSearchInput />
      <Spacing size={8} />
      <ManualGridSection />
    </div>
  );
}
