export type ThemeColors = {
  bg: string;
  surface: string;
  elevated: string;
  border: string;
  accent: string;
  accentSoft: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  success: string;
  successSoft: string;
  warning: string;
  warningSoft: string;
  danger: string;
  dangerSoft: string;
  dangerSubtle: string;
  cardOverlay: string;
};

export type ThemeFonts = {
  light: string;
  regular: string;
  semiBold: string;
  bold: string;
  extraBold: string;
};

export type ThemeConfig = {
  colors: ThemeColors;
  fonts: ThemeFonts;
};

const fonts: ThemeFonts = {
  light: "Urbanist_300Light",
  regular: "Urbanist_400Regular",
  semiBold: "Urbanist_600SemiBold",
  bold: "Urbanist_700Bold",
  extraBold: "Urbanist_800ExtraBold",
};

export const lightColors: ThemeColors = {
  bg: "#F2E8E1",
  surface: "#FFFFFF",
  elevated: "#EAE0DA",
  border: "rgba(0,0,0,0.07)",
  accent: "#1C1C1E",
  accentSoft: "rgba(28,28,30,0.08)",
  text: "#1C1C1E",
  textSecondary: "#9A9088",
  textMuted: "#C8C0B8",
  success: "#7BA68A",
  successSoft: "rgba(123,166,138,0.15)",
  warning: "#D4A84A",
  warningSoft: "rgba(212,168,74,0.15)",
  danger: "#D96B5A",
  dangerSoft: "rgba(217,107,90,0.15)",
  dangerSubtle: "#FDF0EC",
  cardOverlay: "rgba(255,255,255,0.65)",
};

export const darkColors: ThemeColors = {
  bg: "#0E0E12",
  surface: "#18181F",
  elevated: "#222229",
  border: "rgba(255,255,255,0.08)",
  accent: "#C0C0D4",
  accentSoft: "rgba(192,192,212,0.12)",
  text: "#EEEEF2",
  textSecondary: "#84849A",
  textMuted: "#44445A",
  success: "#7BA68A",
  successSoft: "rgba(123,166,138,0.15)",
  warning: "#D4A84A",
  warningSoft: "rgba(212,168,74,0.15)",
  danger: "#D96B5A",
  dangerSoft: "rgba(217,107,90,0.15)",
  dangerSubtle: "rgba(217,107,90,0.08)",
  cardOverlay: "rgba(255,255,255,0.15)",
};

export const lightTheme: ThemeConfig = { colors: lightColors, fonts };
export const darkTheme: ThemeConfig = { colors: darkColors, fonts };

export function getTheme(mode: "light" | "dark"): ThemeConfig {
  return mode === "dark" ? darkTheme : lightTheme;
}

export const theme = lightTheme;
