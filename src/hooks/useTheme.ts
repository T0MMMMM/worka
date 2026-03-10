import { getTheme, ThemeConfig } from "@/src/constants/theme";
import { useThemeStore } from "@/src/store/themeStore";

export function useTheme(): ThemeConfig {
  const mode = useThemeStore((s) => s.mode);
  const customAccent = useThemeStore((s) => s.customAccent);
  const resolved = getTheme(mode);

  if (customAccent) {
    return {
      ...resolved,
      colors: {
        ...resolved.colors,
        accent: customAccent,
        accentSoft: customAccent + "14",
      },
    };
  }

  return resolved;
}
