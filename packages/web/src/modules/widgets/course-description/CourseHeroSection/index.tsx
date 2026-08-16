import FootprintsIcon from "@icons/FootprintsIcon";
import NavigationIcon from "@icons/NavigationIcon";
import TimerIcon from "@icons/TimerIcon";
import EasyDifficultyBadge from "@shared/components/primitives/ui/EasyDifficultyBadge";

const CourseHeroSection = () => {
  return (
    <section className="flex w-full flex-col gap-3">
      <img
        src="/images/courses/course-crew-ridge-v2.jpg"
        alt="당산나무 코스 대표 이미지"
        className="h-[140px] w-full rounded-[15px] object-cover"
      />

      <h2 className="text-3xl font-bold text-black-900">당산나무 코스</h2>

      <div className="flex w-full items-center gap-2.5">
        <div className="flex shrink-0 items-center gap-1.5">
          <FootprintsIcon size={15} className="shrink-0 text-primary" />
          <span className="text-sm font-medium text-black-800">3.2km</span>
        </div>

        <span className="text-sm text-gray-900">·</span>

        <div className="flex shrink-0 items-center gap-1.5">
          <TimerIcon size={15} className="shrink-0 text-primary" />
          <span className="text-sm font-medium text-black-800">1시간 6분</span>
        </div>

        <span className="text-sm text-gray-900">·</span>

        <EasyDifficultyBadge />
      </div>

      {/* TODO(#106): 길찾기 브릿지 연동 전까지 동작 없는 정적 버튼 */}
      <button
        type="button"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-primary"
      >
        <NavigationIcon size={16} className="shrink-0 text-main-white" />
        <span className="text-sm font-semibold text-main-white">길찾기</span>
      </button>
    </section>
  );
};

export default CourseHeroSection;
