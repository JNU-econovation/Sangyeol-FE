import MemberLeaveButtonSection from "@modules/widgets/my-info/MemberLeaveButtonSection";
import MyInfoHeaderSection from "@modules/widgets/my-info/MyInfoHeaderSection";
import ProfileFormSection from "@modules/widgets/my-info/ProfileFormSection";
import Spacing from "@shared/components/primitives/layout/Spacing";

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
