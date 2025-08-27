export type PathTuple = [string, string];

export interface StackContextType {
  portalElement: HTMLElement | null;
  history: PathTuple[];
  push: (path: PathTuple) => void;
  pop: () => void;
}

export interface StackLinkParams {
  href: string;
  // duration?: number;
  preLoad?: boolean;
  animation?: "slide" | "none";
}
