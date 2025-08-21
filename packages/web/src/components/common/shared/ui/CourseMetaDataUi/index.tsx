import type { CourseDifficulty } from "@/types/course";
import ClockIcon from "@icons/ClockIcon";
import PositionPointerIcon from "@icons/PositionPointerIcon";
import DifficultyTag from "@shared/ui/DifficultyTag";

interface CourseMetaDataUiProps {
  distance: number;
  time: number;
  difficulty: CourseDifficulty;
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
        <span className="text-gray-20 text-sm">{distance}km</span>
      </div>
      <div className="flex items-center gap-1">
        <ClockIcon />
        <span className="text-gray-20 text-sm">{time}시간</span>
      </div>
      <DifficultyTag difficulty={difficulty} />
    </div>
  );
}
