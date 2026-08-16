import type { CourseDifficulty } from "@shared/types/course";
import { cn } from "@shared/utils/cn";
import { cva } from "class-variance-authority";

const DIFFICULTY_MAP: Record<CourseDifficulty, string> = {
  EASY: "쉬움",
  NORMAL: "보통",
  HARD: "어려움",
};

export const DifficultyTagVariants = cva(
  "rounded-xl border-gray-200 border px-3 text-yellow-500 text-sm shrink-0",
  {
    variants: {
      difficulty: {
        EASY: "text-success",
        NORMAL: "text-warning",
        HARD: "text-error",
      },
    },
  },
);

interface DifficultyTagProps {
  difficulty: CourseDifficulty;
}

export default function DifficultyTag({ difficulty }: DifficultyTagProps) {
  return (
    <div className={cn(DifficultyTagVariants({ difficulty }))}>
      {DIFFICULTY_MAP[difficulty]}
    </div>
  );
}
