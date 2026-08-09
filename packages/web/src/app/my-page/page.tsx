import CustomerCenterSection from "@modules/widgets/my-page/CustomerCenterSection";
import EnvironmentSection from "@modules/widgets/my-page/EnvironmentSection";
import MyInfoSection from "@modules/widgets/my-page/MyInfoSection";
import Spacing from "@shared/components/primitives/layout/Spacing";
import LogoutButton from "@modules/features/authenticate/LogoutButton";

export default function MyPage() {
  return (
    <div className="max-h-screen overflow-y-auto">
      <Spacing size={4} />
      <MyInfoSection />
      <Spacing size={5} />
      <div className="h-3 bg-gray-100" />
      <div className="p-5">
        <CustomerCenterSection />
        <EnvironmentSection />
        <Spacing size={4} />
        <LogoutButton />
      </div>
      <Spacing size={4} />
    </div>
  );
}
