import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserState {
  name: string;
  email: string;
  avatarUrl: string | null;
  isLoggedIn: boolean;
  setUser: (user: Partial<Omit<UserState, "setUser" | "logout">>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      avatarUrl: null,
      isLoggedIn: false,

      setUser: (user) => set((state) => ({ ...state, ...user })),

      logout: () =>
        set({ name: "", email: "", avatarUrl: null, isLoggedIn: false }),
    }),
    {
      name: "worka-user",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
