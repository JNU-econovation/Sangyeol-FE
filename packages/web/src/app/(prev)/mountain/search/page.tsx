import CurrentSearchMountainSection from "@modules/widgets/mountain/CurrentSearchMountainSection";
import MountainSearchInputSection from "@modules/widgets/mountain/MountainSearchInputSection";
import RealtimePopularSearchesSection from "@modules/widgets/mountain/RealtimePopularSearchesSection";
import Spacing from "@shared/components/primitives/layout/Spacing";
import BackButton from "@modules/features/route/BackButton";

const MountainSearchPage = () => {
  return (
    <div className="bg-gray-300 h-screen">
      <div className="p-6 bg-white">
        <BackButton animation="none" />
        <Spacing size={6} />
        <MountainSearchInputSection />
        <Spacing size={6} />
        <CurrentSearchMountainSection />
      </div>
      <div className="p-6">
        <RealtimePopularSearchesSection />
      </div>
    </div>
  );
};

export default MountainSearchPage;
