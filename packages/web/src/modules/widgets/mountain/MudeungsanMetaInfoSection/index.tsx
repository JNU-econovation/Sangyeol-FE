import MudeungsanHeaderSection from "@/modules/features/mountain/MudeungsanHeaderSection";
import MudeungsanControlInfo from "@modules/features/mountain/MudeungsanControlInfo";
import MudeungsanWeatherNotice from "@modules/features/mountain/MudeungsanWeatherNotice";
import Spacing from "@shared/components/primitives/layout/Spacing";

const MudeungsanMetaInfoSection = () => {
  return (
    <section>
      {/* <div className="w-full h-32 shrink-0 rounded-xl bg-amber-100" /> */}
      <Spacing size={4} />
      <MudeungsanHeaderSection />
      <Spacing size={4} />
      <MudeungsanWeatherNotice />
      <Spacing size={4} />
      <MudeungsanControlInfo />
    </section>
  );
};

export default MudeungsanMetaInfoSection;
