import Spacing from "@shared/components/primitives/layout/Spacing";
import Text from "@shared/components/primitives/ui/Text";

const RealtimePopularSearchesSection = () => {
  return (
    <section className="">
      <span className="fontSize text-md fontWeight font-bold color text-primary">
        실시간 인기 검색어
      </span>
      <Spacing size={4} />
      <hr className="border-gray-600" />
      <Spacing size={4} />
      <span className="text-sm font-medium text-gray-900">
        추후 기능이 활성화 될 예정입니다
      </span>
    </section>
  );
};

export default RealtimePopularSearchesSection;
