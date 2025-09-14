export type CourseDifficulty = "EASY" | "NORMAL" | "HARD";

export interface Course {
  id: string;
  name: string;
  length: number;
  duration: number;
  difficulty: CourseDifficulty;
  bookmark: boolean;
  image: string;
  displayName: string;
  peakBaseId: string;
}
