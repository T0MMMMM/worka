import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ThemeStore {
  mode: "light" | "dark";
  customAccent: string | null;
  presetName: string | null;
  toggleMode: () => void;
  setAccent: (color: string | null) => void;
  setPreset: (name: string | null) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "light",
      customAccent: null,
      presetName: null,

      toggleMode: () =>
        set((state) => ({
          mode: state.mode === "light" ? "dark" : "light",
        })),

      setAccent: (color) => set({ customAccent: color }),

      setPreset: (name) => set({ presetName: name }),
    }),
    {
      name: "worka-theme",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
