import RealtimePopularSearchesSection from "@pages/mountain/RealtimePopularSearchesSection";
import CurrentSearchMountainSection from "@pages/mountain/CurrentSearchMountainSection";
import MountainSearchInputSection from "@pages/mountain/MountainSearchInputSection";
import Spacing from "@shared/layout/Spacing";
import BackButton from "@widgets/route/BackButton";

const MountainSearchPage = () => {
  return (
    <div className="bg-gray-300 h-screen">
      <div className="p-6 bg-white">
        <Spacing size={16} />
        <BackButton animation="none" />
        <Spacing size={9} />
        <MountainSearchInputSection />
        <Spacing size={8} />
        <CurrentSearchMountainSection />
      </div>
      <div className="p-6">
        <RealtimePopularSearchesSection />
      </div>
    </div>
  );
};

export default MountainSearchPage;
