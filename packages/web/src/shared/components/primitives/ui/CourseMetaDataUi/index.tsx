import type { CourseDifficulty } from "@shared/types/course";
import FootprintsIcon from "@icons/FootprintsIcon";
import TimerIcon from "@icons/TimerIcon";
import EasyDifficultyBadge from "@shared/components/primitives/ui/EasyDifficultyBadge";
import HardDifficultyBadge from "@shared/components/primitives/ui/HardDifficultyBadge";
import NormalDifficultyBadge from "@shared/components/primitives/ui/NormalDifficultyBadge";

const ICON_SIZE = 15;

interface CourseMetaDataUiProps {
  distance: number;
  time: number;
  difficulty?: CourseDifficulty;
}

export default function CourseMetaDataUi({
  difficulty,
  distance,
  time,
}: CourseMetaDataUiProps) {
  const durationText = `${Math.floor(time / 60)}시간 ${time % 60}분`;

  return (
    <div className="flex items-center gap-3">
      <div className="flex shrink-0 items-center gap-[5px]">
        <FootprintsIcon size={ICON_SIZE} className="shrink-0 text-primary" />
        <span className="text-sm font-semibold text-black-800">
          {distance}km
        </span>
      </div>
      <div className="h-3 w-px shrink-0 bg-gray-600" />
      <div className="flex shrink-0 items-center gap-[5px]">
        <TimerIcon size={ICON_SIZE} className="shrink-0 text-primary" />
        <span className="text-sm font-semibold text-black-800">
          {durationText}
        </span>
      </div>
      {difficulty && (
        <>
          <div className="h-3 w-px shrink-0 bg-gray-600" />
          {difficulty === "EASY" && <EasyDifficultyBadge />}
          {difficulty === "NORMAL" && <NormalDifficultyBadge />}
          {difficulty === "HARD" && <HardDifficultyBadge />}
        </>
      )}
    </div>
  );
}
