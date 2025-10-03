import type { CourseDifficulty } from "@/types/course";
import ClockIcon from "@icons/ClockIcon";
import PositionPointerIcon from "@icons/PositionPointerIcon";
import DifficultyTag from "@shared/ui/DifficultyTag";

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
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1">
        <PositionPointerIcon />
        <span className="text-gray-900 text-sm font-semibold">
          {distance}km
        </span>
      </div>
      <div className="flex items-center gap-1">
        <ClockIcon />
        <span className="text-gray-900 text-sm font-semibold">{time}시간</span>
      </div>
      {difficulty ? (
        <DifficultyTag difficulty={difficulty} />
      ) : (
        <div className="w-10" />
      )}
    </div>
  );
}
