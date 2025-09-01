// export type CourseDifficulty = "쉬움" | "보통" | "어려움";
export type CourseDifficulty = "EASY" | "NORMAL" | "HARD";

export interface Course {
  id: string;
  name: string;
  length: number;
  duration: number;
  difficulty: CourseDifficulty;
  bookmark: boolean;
  image: string;
}
