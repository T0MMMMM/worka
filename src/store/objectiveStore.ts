import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Objective } from "../types/objective";

const INITIAL_OBJECTIVES: Objective[] = [
  {
    id: "1",
    title: "Apprendre React Native",
    progress: 0.75,
    color: "#2196F3",
    accent: "#2196F3",
    daysLeft: 12,
    completed: false,
  },
  {
    id: "2",
    title: "Lire 2 livres par mois",
    progress: 0.4,
    color: "#9C27B0",
    accent: "#9C27B0",
    daysLeft: 18,
    completed: false,
  },
  {
    id: "3",
    title: "Marathon de Paris",
    progress: 0.9,
    color: "#FF5252",
    accent: "#FF5252",
    daysLeft: 3,
    completed: false,
  },
];

interface ObjectiveStore {
  objectives: Objective[];
  archivedObjectives: Objective[];
  addObjective: (objective: Omit<Objective, "id">) => void;
  updateObjective: (id: string, updates: Partial<Objective>) => void;
  deleteObjective: (id: string) => void;
  updateProgress: (id: string, progress: number, completed: boolean) => void;
  archiveObjective: (id: string) => void;
}

export const useObjectiveStore = create<ObjectiveStore>()(
  persist(
    (set) => ({
      objectives: INITIAL_OBJECTIVES,
      archivedObjectives: [],

      addObjective: (objective) =>
        set((state) => ({
          objectives: [
            ...state.objectives,
            { ...objective, id: Date.now().toString() },
          ],
        })),

      updateObjective: (id, updates) =>
        set((state) => ({
          objectives: state.objectives.map((o) =>
            o.id === id ? { ...o, ...updates } : o
          ),
        })),

      deleteObjective: (id) =>
        set((state) => ({
          objectives: state.objectives.filter((o) => o.id !== id),
        })),

      updateProgress: (id, progress, completed) =>
        set((state) => ({
          objectives: state.objectives.map((o) =>
            o.id === id
              ? {
                  ...o,
                  progress: completed ? 1 : progress,
                  completed,
                  completedAt: completed
                    ? new Date().toISOString()
                    : undefined,
                }
              : o
          ),
        })),

      archiveObjective: (id) =>
        set((state) => {
          const objective = state.objectives.find((o) => o.id === id);
          if (!objective) return state;
          return {
            objectives: state.objectives.filter((o) => o.id !== id),
            archivedObjectives: [
              ...state.archivedObjectives,
              { ...objective, archivedAt: new Date().toISOString() },
            ],
          };
        }),
    }),
    {
      name: "worka-objectives",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
