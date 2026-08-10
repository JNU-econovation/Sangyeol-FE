import MudeungsanMetaInfoSection from "@modules/widgets/mountain/MudeungsanMetaInfoSection";
import SafeArea from "@shared/components/primitives/layout/SafeArea";
import Spacing from "@shared/components/primitives/layout/Spacing";

const HomePage = () => {
  return (
    <SafeArea className="bg-gray-300 min-h-dvh">
      <div className="px-6">
        <Spacing size={4} />
        <MudeungsanMetaInfoSection />
      </div>
    </SafeArea>
  );
};

export default HomePage;
