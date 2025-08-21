import EmergencyPersonalInfoSection from "@pages/my-info/EmergencyPersonalInfoSection";
import MyInfoHeaderSection from "@pages/my-info/MyInfoHeaderSection";
import PersonalInfoSection from "@pages/my-info/PersonalInfoSection";
import Spacing from "@shared/layout/Spacing";

export default function MyInfoPage() {
  return (
    <div className="px-6 max-h-screen overflow-y-auto">
      <MyInfoHeaderSection />
      <Spacing size={4} />
      <PersonalInfoSection />
      <Spacing size={4} />
      <EmergencyPersonalInfoSection />
      <Spacing size={4} />
    </div>
  );
}
