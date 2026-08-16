import V1Header from "@/modules/features/header/V1Header";
import Clock3Icon from "@icons/Clock3Icon";
import FootprintsIcon from "@icons/FootprintsIcon";
import SafeArea from "@shared/components/primitives/layout/SafeArea";
import CourseCard from "@shared/components/primitives/ui/CourseCard";
import EasyDifficultyBadge from "@shared/components/primitives/ui/EasyDifficultyBadge";
import HardDifficultyBadge from "@shared/components/primitives/ui/HardDifficultyBadge";
import NormalDifficultyBadge from "@shared/components/primitives/ui/NormalDifficultyBadge";
import type { CourseDifficulty } from "@shared/types/course";
import { cn } from "@shared/utils/cn";

const CoursesPage = () => {
  return (
    <SafeArea
      safetyAreaClassName="bg-gray-300"
      contentClassName="bg-gray-300"
      bottomSpacing={8}
    >
      <div className="flex flex-col gap-6 px-5 pt-4">
        <V1Header title="무등산 국립공원" />

        <section className="flex w-full flex-col gap-3.5 pb-6">
          <CourseCard
            imageSrc="/images/courses/course-crew-ridge-v2.jpg"
            title="당산나무 코스"
            distance="9.2km"
            duration="1시간 44분"
            difficulty="EASY"
          />

          <TempCourseItem
            imageSrc="/images/courses/course-saeinbong-ipseokdae.jpg"
            imageHeight={203}
            title="새인봉-입석대 코스"
            distance="8.0km"
            duration="2시간 21분"
            difficulty="NORMAL"
          />

          <TempCourseItem
            imageSrc="/images/courses/course-neutjae-yetgil.jpg"
            imageHeight={234}
            title="늦재-옛길 코스"
            distance="8.0km"
            duration="4시간 18분"
            difficulty="NORMAL"
          />

          <TempCourseItem
            imageSrc="/images/courses/course-simujigi-falls.png"
            imageHeight={183}
            title="시무지기폭포 코스"
            distance="9.0km"
            duration="4시간"
            difficulty="HARD"
          />
        </section>
      </div>
    </SafeArea>
  );
};

interface CourseItemProps {
  imageSrc: string;
  imageHeight: number;
  title: string;
  distance: string;
  duration: string;
  difficulty: CourseDifficulty;
  copyright?: string;
  imageRounded?: boolean;
}

const TempCourseItem = ({
  imageSrc,
  title,
  distance,
  duration,
  difficulty,
}: CourseItemProps) => {
  return (
    <article className="flex w-full flex-col rounded-b-xl border border-gray-600 bg-main-white">
      <div className={cn("relative w-full shrink-0 h-auto")}>
        <img src={imageSrc} alt={title} />

        <span className="absolute right-2 bottom-1 text-[9px] font-light tracking-[0.3px] text-main-white opacity-85 [text-shadow:0_0_2px_rgba(0,0,0,0.6)]">
          © 한국관광공사
        </span>
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
};

export default CoursesPage;
