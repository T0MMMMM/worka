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
  bg: "#F7F7FA",
  surface: "#FFFFFF",
  elevated: "#F0F0F5",
  border: "rgba(0,0,0,0.06)",
  accent: "#7B61FF",
  accentSoft: "rgba(123,97,255,0.08)",
  text: "#1A1A2E",
  textSecondary: "#8A8A9A",
  textMuted: "#C5C5D0",
  success: "#22C55E",
  successSoft: "rgba(34,197,94,0.08)",
  warning: "#F59E0B",
  warningSoft: "rgba(245,158,11,0.08)",
  danger: "#EF4444",
  dangerSoft: "rgba(239,68,68,0.08)",
};

export const darkColors: ThemeColors = {
  bg: "#0F0F1A",
  surface: "#1A1A2E",
  elevated: "#252540",
  border: "rgba(255,255,255,0.08)",
  accent: "#9B85FF",
  accentSoft: "rgba(155,133,255,0.12)",
  text: "#F0F0F5",
  textSecondary: "#8A8A9A",
  textMuted: "#4A4A5A",
  success: "#34D399",
  successSoft: "rgba(52,211,153,0.12)",
  warning: "#FBBF24",
  warningSoft: "rgba(251,191,36,0.12)",
  danger: "#F87171",
  dangerSoft: "rgba(248,113,113,0.12)",
};

export const lightTheme: ThemeConfig = { colors: lightColors, fonts };
export const darkTheme: ThemeConfig = { colors: darkColors, fonts };

export function getTheme(mode: "light" | "dark"): ThemeConfig {
  return mode === "dark" ? darkTheme : lightTheme;
}

// Default export for backward compatibility during migration
export const theme = lightTheme;
