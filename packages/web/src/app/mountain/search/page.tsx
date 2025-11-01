import CurrentSearchMountainSection from "@pages/mountain/CurrentSearchMountainSection";
import MountainSearchInputSection from "@pages/mountain/MountainSearchInputSection";
import RealtimePopularSearchesSection from "@pages/mountain/RealtimePopularSearchesSection";
import Spacing from "@shared/layout/Spacing";
import BackButton from "@widgets/route/BackButton";

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
