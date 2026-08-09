import Spacing from "@shared/components/primitives/layout/Spacing";
import BgLogoIcon from "@icons/BgLogoIcon";

const NoResult = () => {
  return (
    <div className="flex justify-center items-center h-full bg-gray-200">
      <div className="flex justify-center items-center flex-col ">
        <BgLogoIcon />
        <Spacing size={8} />
        <span className="text-3xl font-semibold text-gray-700">
          검색 결과 없음
        </span>
        <Spacing size={3} />
        <span className="text-lg font-semibold text-gray-700">
          산 이름만 검색해 주세요.
        </span>
      </div>
    </div>
  );
};

export default NoResult;
