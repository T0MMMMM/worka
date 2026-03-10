export interface ThemePreset {
  name: string;
  label: string;
  accent: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  { name: "purple", label: "Violet", accent: "#7B61FF" },
  { name: "blue", label: "Bleu Océan", accent: "#3B82F6" },
  { name: "emerald", label: "Émeraude", accent: "#10B981" },
  { name: "rose", label: "Rose", accent: "#F43F5E" },
  { name: "amber", label: "Ambre", accent: "#F59E0B" },
  { name: "slate", label: "Ardoise", accent: "#64748B" },
];
