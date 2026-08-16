import type { CourseDifficulty } from "@shared/types/course";
import Clock3Icon from "@icons/Clock3Icon";
import FootprintsIcon from "@icons/FootprintsIcon";
import EasyDifficultyBadge from "@shared/components/primitives/ui/EasyDifficultyBadge";
import HardDifficultyBadge from "@shared/components/primitives/ui/HardDifficultyBadge";
import NormalDifficultyBadge from "@shared/components/primitives/ui/NormalDifficultyBadge";

export interface CourseCardProps {
  imageSrc: string;
  title: string;
  distance: string;
  duration: string;
  difficulty: CourseDifficulty;
}

export default function CourseCard({
  imageSrc,
  title,
  distance,
  duration,
  difficulty,
}: CourseCardProps) {
  return (
    <article className="flex w-full flex-col rounded-xl border border-gray-600 bg-main-white overflow-hidden">
      <div className="relative w-full shrink-0">
        <img src={imageSrc} alt={title} height={116} className="object-cover" />
      </div>

      <div className="flex w-full flex-col gap-2.5 p-3.5">
        <div className="flex w-full items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-black-900">{title}</h2>
        </div>

        <div className="flex w-full items-center gap-3.5">
          <div className="flex shrink-0 items-center gap-[5px]">
            <FootprintsIcon size={14} className="shrink-0 text-gray-900" />
            <span className="text-[11px] font-normal text-black-800">
              {distance}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-[5px]">
            <Clock3Icon size={14} className="shrink-0 text-gray-900" />
            <span className="text-[11px] font-normal text-black-800">
              {duration}
            </span>
          </div>
          {difficulty === "EASY" && <EasyDifficultyBadge />}
          {difficulty === "NORMAL" && <NormalDifficultyBadge />}
          {difficulty === "HARD" && <HardDifficultyBadge />}
        </div>
      </div>
    </article>
  );
}
