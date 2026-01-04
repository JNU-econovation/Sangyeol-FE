import TermListSection from "@screens/terms/TermListSection";
import TermsDescriptionSection from "@screens/terms/TermsDescriptionSection";
import TermsHeaderSection from "@screens/terms/TermsHeaderSection";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";

const TermsScreen = () => {
  return (
    <ScreenContainer>
      <Spacing size={18} />
      <TermsHeaderSection />
      <Spacing size={32} />
      <TermsDescriptionSection />
      <Spacing size={20} />
      <TermListSection />
    </ScreenContainer>
  );
};

export default TermsScreen;
