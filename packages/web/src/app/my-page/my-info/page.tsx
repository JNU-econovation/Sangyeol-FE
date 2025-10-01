import MemberLeaveButtonSection from "@pages/my-info/MemberLeaveButtonSection";
import MyInfoHeaderSection from "@pages/my-info/MyInfoHeaderSection";
import ProfileFormSection from "@pages/my-info/ProfileFormSection";
import Spacing from "@shared/layout/Spacing";

export default function MyInfoPage() {
  return (
    <>
      <MyInfoHeaderSection />
      <div className="px-6 max-h-screen overflow-y-auto relative">
        <Spacing size={20} />
        <ProfileFormSection />
        <Spacing size={10} />
        <MemberLeaveButtonSection />
        <Spacing size={4} />
      </div>
    </>
  );
}
