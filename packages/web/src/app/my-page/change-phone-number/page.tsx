import ChangeNumberFormSection from "@modules/widgets/change-phone-number/ChangeNumberFormSection";
import ChangePhoneNumberHeaderSection from "@modules/widgets/change-phone-number/ChangePhoneNumberHeaderSection";
import Spacing from "@shared/components/primitives/layout/Spacing";

export default function ChangePhoneNumberPage() {
  return (
    <div className="p-6">
      <ChangePhoneNumberHeaderSection />
      <Spacing size={12} />
      <ChangeNumberFormSection />
    </div>
  );
}
