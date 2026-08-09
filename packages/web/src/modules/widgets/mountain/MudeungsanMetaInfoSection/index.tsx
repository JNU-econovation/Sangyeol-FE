import MudeungsanControlInfo from "@modules/features/mountain/MudeungsanControlInfo";
import MudeungsanWeatherNotice from "@modules/features/mountain/MudeungsanWeatherNotice";
import Spacing from "@shared/components/primitives/layout/Spacing";

const MudeungsanMetaInfoSection = () => {
  return (
    <section>
      <div className="w-full h-32 shrink-0 rounded-xl bg-amber-100" />
      <Spacing size={4} />
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-black-900">
          무등산국립공원
        </h2>
        <button className="text-sm font-semibold text-primary">
          코스 보러가기 ›
        </button>
      </div>
      <Spacing size={4} />
      <MudeungsanWeatherNotice />
      <Spacing size={4} />
      <MudeungsanControlInfo />
    </section>
  );
};

export default MudeungsanMetaInfoSection;
