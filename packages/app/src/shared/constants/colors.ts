export const COLOR_PALETTE = {
  primary: "#2B7552",
  primaryAlt: "#41956A",
  primarySoft: "#EAF2EE",
  accentSun: "#F2994A",
  text: "#000000",
  textSecondary: "#333333",
  muted: "#828282",
  border: "#D9D9D9",
  surface: "#FFFFFF",
  bg: "#F4F4F4",
  danger: "#C4564F",
  dangerSoft: "#F6E7E5",
} as const;

export type ColorKey = keyof typeof COLOR_PALETTE;
