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

  green800: "#41956A",
  green700: "#41956A",
  green600: "#EAF2EE",
  green500: "#EAF2EE",

  black900: "#000000",
  black800: "#333333",

  mainWhite: "#FFFFFF",

  gray900: "#828282",
  gray800: "#9D9D9D",
  gray700: "#ACACAC",
  gray600: "#D9D9D9",
  gray500: "#E0E0E0",
  gray400: "#E9E9EB",
  gray300: "#F4F4F4",

  kakaoYellow: "#FAE64D",
  red: "#FF0000",
  yellow: "#FBBC05",
  blue: "#2D6EFF",

  error: "#FF0000",
  success: "#2D6EFF",
  warning: "#FBBC05",
} as const;

export type ColorKey = keyof typeof COLOR_PALETTE;
