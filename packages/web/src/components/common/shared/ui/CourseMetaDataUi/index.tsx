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
  const durationText = `${Math.floor(time / 60)}h ${time % 60}m`;
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

        <span className="text-gray-900 text-sm font-semibold">
          {durationText}
        </span>
      </div>
      {difficulty ? (
        <DifficultyTag difficulty={difficulty} />
      ) : (
        <div style={{ visibility: "hidden" }}>
          <DifficultyTag difficulty="NORMAL" />
        </div>
      )}
    </div>
  );
}
