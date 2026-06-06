import Header from "@shared/ui/Header";
import LogoutWithBackButton from "@widget/LogoutWithBackButton";

const TermsHeaderSection = () => {
  return (
    <Header headerTitle="이용 약관" headerLeft={<LogoutWithBackButton />} />
  );
};

export default TermsHeaderSection;
