import ManualGridSection from "@modules/widgets/safe-manual/ManualGridSection";
import ManualSearchInput from "@modules/widgets/safe-manual/ManualSearchInput";
import Spacing from "@shared/components/primitives/layout/Spacing";

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
