import ChangeNumberFormSection from "@pages/change-phone-number/ChangeNumberFormSection";
import ChangePhoneNumberHeaderSection from "@pages/change-phone-number/ChangePhoneNumberHeaderSection";
import Spacing from "@shared/layout/Spacing";

export default function ChangePhoneNumberPage() {
  return (
    <div className="p-6">
      <ChangePhoneNumberHeaderSection />
      <Spacing size={12} />
      <ChangeNumberFormSection />
    </div>
  );
}
