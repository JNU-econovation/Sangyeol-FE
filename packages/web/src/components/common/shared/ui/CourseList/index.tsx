import type { CourseDifficulty } from "@/types/course";
import StarBlockIcon from "@icons/StarBlockIcon";
import StarWeakIcon from "@icons/StarWeakIcon";
import CourseMetaDataUi from "@shared/ui/CourseMetaDataUi";
import Image from "next/image";

interface CourseListProps {
  name: string;
  duration: number;
  length: number;
  difficulty: CourseDifficulty;
  stared: boolean;
  imageSrc: string;
  onSetStared?: () => void;
  onResetStared?: () => void;
}

export default function CourseList({
  name,
  duration,
  length,
  difficulty,
  stared,
  imageSrc,
  onSetStared,
  onResetStared,
}: CourseListProps) {
  return (
    <li className="flex gap-4 justify-between bg-white rounded-lg p-3">
      <div className="flex flex-col justify-between grow">
        <span className="text-lg font-semibold">{name}</span>
        <CourseMetaDataUi
          time={duration}
          distance={length}
          difficulty={difficulty}
        />
      </div>
      <div className="w-24 h-24 bg-slate-100 rounded-xl relative overflow-hidden">
        <Image src={imageSrc} alt="코스 경로" width={96} height={96} />
        <div className="absolute top-2 right-2">
          {stared ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onResetStared?.();
              }}
            >
              <StarBlockIcon alt="북마크된 코스" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSetStared?.();
              }}
            >
              <StarWeakIcon alt="북마크되지 않은 코스" />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
