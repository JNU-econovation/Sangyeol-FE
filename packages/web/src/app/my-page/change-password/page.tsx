import ChangePasswordHeaderSection from "@pages/change-password/ChangePasswordHeaderSection";
import PasswordInfoSection from "@pages/change-password/PasswordInfoSection";
import Spacing from "@shared/layout/Spacing";

export default function ChangePasswordPage() {
  return (
    <div className="p-6">
      <ChangePasswordHeaderSection />
      <Spacing size={12} />
      <PasswordInfoSection />
    </div>
  );
}
