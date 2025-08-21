import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import MapWithCurrentPositionSection from "@widgets/map/MapWithCurrentPositionSection";
import BackButton from "@widgets/route/BackButton";

export default function CourseSearchPage() {
  return (
    <div className="relative w-screen h-screen">
      <div className="px-6 z-10 fixed w-full">
        <Spacing size={4} />
        <BackButton />
        <Spacing size={3} />

        <input
          type="text"
          placeholder="출발지 입력"
          className="w-full px-4 py-2 bg-white rounded-xl shadow-sm"
        />
        <Spacing size={4} />
        <input
          type="text"
          placeholder="경유지 입력"
          className="w-full px-4 py-2 bg-white rounded-xl shadow-sm"
        />
        <Spacing size={4} />
        <input
          type="text"
          placeholder="도착지 입력"
          className="w-full px-4 py-2 bg-white rounded-xl shadow-sm"
        />

        <Spacing size={4} />
        <Button fullWidth>검색하기</Button>
      </div>

      {/* 지금은 기능이 없는 맵을 사용하지만, 추후에 기능을 추가하여 감싼 page 컴포넌트를 만들어서 사용 에정 */}
      <MapWithCurrentPositionSection />
    </div>
  );
}
