import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface TaskTheme {
  id: string;
  label: string;
  color: string;
  emoji: string;
}

const DEFAULT_THEMES: TaskTheme[] = [
  { id: "1", label: "Travail",  color: "#FF5722", emoji: "💼" },
  { id: "2", label: "Design",   color: "#2196F3", emoji: "🎨" },
  { id: "3", label: "Perso",    color: "#22C55E", emoji: "🙂" },
  { id: "4", label: "Sport",    color: "#9C27B0", emoji: "🏃" },
];

interface TaskThemeStore {
  themes: TaskTheme[];
  addTheme: (theme: Omit<TaskTheme, "id">) => void;
  deleteTheme: (id: string) => void;
}

export const useTaskThemeStore = create<TaskThemeStore>()(
  persist(
    (set) => ({
      themes: DEFAULT_THEMES,

      addTheme: (theme) =>
        set((state) => ({
          themes: [...state.themes, { ...theme, id: Date.now().toString() }],
        })),

      deleteTheme: (id) =>
        set((state) => ({
          themes: state.themes.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "worka-task-themes",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
