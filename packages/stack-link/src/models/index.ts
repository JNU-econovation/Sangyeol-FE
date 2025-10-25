export type PathTuple = [string, string]; // [현재 풀 경로, 이동할 경로]

export interface StackContextType {
  history: PathTuple[];
  push: (path: PathTuple) => void;
  pop: () => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
  handleGoBack: () => void;
}

export interface StackLinkParams {
  href: string;
  duration?: number;
  preLoad?: boolean;
  animation?: "slide" | "none" | "fade";
}
